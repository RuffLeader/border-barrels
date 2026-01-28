import fs from "fs";
import fetch from "node-fetch";
import cheerio from "cheerio";

const CBB_API_KEY = process.env.CBB_API_KEY;
if (!CBB_API_KEY) throw new Error("Missing CBB_API_KEY");

// Ensure public folder exists
if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });

const BASE_CBB = "https://api.collegebasketballdata.com";

// --------------------
// Helper: fetch JSON
async function fetchJSON(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`API error ${res.status} for ${url}`);
  return res.json();
}

// --------------------
// 1️⃣ Get Top 25 teams from CBB
async function getTop25Teams() {
  const rankings = await fetchJSON(`${BASE_CBB}/rankings`, { Authorization: `Bearer ${CBB_API_KEY}` });
  const apTop25 = rankings
    .filter(r => r.pollType === "AP Top 25")
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25);

  return apTop25.map(r => ({
    name: r.team.toLowerCase(),
    rank: r.ranking
  }));
}

// --------------------
// 2️⃣ Fetch all NCAA D-I teams from ESPN
async function getAllEpsnTeams() {
  const res = await fetch("https://www.espn.com/mens-college-basketball/teams");
  const html = await res.text();
  const $ = cheerio.load(html);
  const teams = [];

  $("a.AnchorLink").each((i, el) => {
    const href = $(el).attr("href");
    const name = $(el).text();
    const match = href?.match(/team\/_\/id\/(\d+)/);
    if (match) {
      const id = Number(match[1]);
      teams.push({ name: name.toLowerCase(), id });
    }
  });

  return teams;
}

// --------------------
// 3️⃣ Match Top 25 teams to ESPN IDs
function mapTop25ToESPN(top25, espnTeams) {
  const map = new Map();
  top25.forEach(t => {
    const match = espnTeams.find(e => e.name.includes(t.name) || t.name.includes(e.name));
    if (match) map.set(t.name, match.id);
    else console.warn("No ESPN match for:", t.name);
  });
  return map;
}

// --------------------
// 4️⃣ Fetch future games for a team from ESPN
async function getTeamGamesESPN(teamId) {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/college-men/teams/${teamId}/schedule`;
  const data = await fetchJSON(url);
  if (!data.events) return [];
  return data.events.filter(e => new Date(e.date) >= new Date());
}

// --------------------
// 5️⃣ Format date for iCal
function formatDate(dateStr) {
  return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

// --------------------
// 6️⃣ Build iCal
function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

// --------------------
// 7️⃣ Main
(async () => {
  const top25 = await getTop25Teams();
  console.log("Top 25 teams:", top25.map(t => t.name));

  const espnTeams = await getAllEpsnTeams();
  console.log("Fetched ESPN teams:", espnTeams.length);

  const espnMap = mapTop25ToESPN(top25, espnTeams);

  const rankMap = new Map();
  top25.forEach(t => rankMap.set(t.name, t.rank));

  // Fetch all games in parallel
  const allGamesArrays = await Promise.all(
    Array.from(espnMap.values()).map(teamId => getTeamGamesESPN(teamId))
  );
  const allGames = allGamesArrays.flat();

  console.log("Total games fetched:", allGames.length);
  console.log("Sample first 5 games:", allGames.slice(0, 5));

  const seenGameIds = new Set();
  const events = [];

  for (const g of allGames) {
    if (seenGameIds.has(g.id)) continue;
    seenGameIds.add(g.id);

    const homeComp = g.competitions[0].competitors.find(c => c.homeAway === "home");
    const awayComp = g.competitions[0].competitors.find(c => c.homeAway === "away");
    const homeName = homeComp.team.displayName.toLowerCase();
    const awayName = awayComp.team.displayName.toLowerCase();

    const homeRank = rankMap.get(homeName);
    const awayRank = rankMap.get(awayName);

    if (!homeRank && !awayRank) continue;

    const summary = `${homeRank ? "#" + homeRank + " " : ""}${homeComp.team.displayName} vs ${awayRank ? "#" + awayRank + " " : ""}${awayComp.team.displayName}`;
    const start = formatDate(g.date);
    const end = formatDate(new Date(new Date(g.date).getTime() + 2 * 60 * 60 * 1000).toISOString());
    const location = g.competitions[0].venue?.fullName || "";

    events.push(`
BEGIN:VEVENT
UID:espn-${g.id}@borderbarrels
SEQUENCE:0
STATUS:CONFIRMED
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:${location}
END:VEVENT
`);
  }

  // Sort events chronologically
  events.sort((a, b) => {
    const aStart = a.match(/DTSTART:(\d+)/)[1];
    const bStart = b.match(/DTSTART:(\d+)/)[1];
    return aStart.localeCompare(bStart);
  });

  fs.writeFileSync("public/top25.ics", buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
