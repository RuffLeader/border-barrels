import fs from "fs";

const API_KEY = process.env.CBB_API_KEY;
const BASE = "https://api.collegebasketballdata.com";

if (!API_KEY) throw new Error("Missing CBB_API_KEY");

// Ensure public folder exists
if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });

const headers = { Authorization: `Bearer ${API_KEY}` };

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`API error ${res.status} for ${url}`);
  return res.json();
}

// Get current AP Top 25 teams
async function getTop25Teams() {
  const rankings = await fetchJSON(`${BASE}/rankings`);
  const apTop25 = rankings
    .filter(r => r.pollType === "AP Top 25")
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25);

  return apTop25.map(r => ({
    team: r.team,
    rank: r.ranking,
    teamId: r.teamId
  }));
}

// Get all games for a team in the current season
async function getTeamGames(teamId) {
  const season = new Date().getFullYear(); // current year as season
  const seasonType = "regular";           // regular season
  const games = await fetchJSON(`${BASE}/games?teamId=${teamId}&season=${season}&seasonType=${seasonType}`);
  return games;
}

// Format iCal date
function formatDate(dateStr) {
  return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Build iCal content
function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

(async () => {
  const teams = await getTop25Teams();
  const teamMap = new Map();
  teams.forEach(t => teamMap.set(t.teamId, t));

  // Fetch all team games in parallel
  const allGamesArrays = await Promise.all(teams.map(t => getTeamGames(t.teamId)));
  const allGames = allGamesArrays.flat();

  // TEMP LOG for debugging
  console.log("Total games fetched:", allGames.length);
  console.log("Sample of first 5 games:", allGames.slice(0,5));

  const seen = new Set();
  const events = [];

  for (const g of allGames) {
    if (!g.startDate || !g.homeTeamId || !g.awayTeamId) continue;
    if (new Date(g.startDate) < new Date()) continue; // skip past games

    const uid = `ncaa-${g.id}@borderbarrels`;
    if (seen.has(uid)) continue;
    seen.add(uid);

    const homeRank = teamMap.get(g.homeTeamId)?.rank;
    const awayRank = teamMap.get(g.awayTeamId)?.rank;

    const summary = `${homeRank ? "#" + homeRank + " " : ""}${g.homeTeam} vs ${awayRank ? "#" + awayRank + " " : ""}${g.awayTeam}`;
    const start = formatDate(g.startDate);
    const end = formatDate(new Date(new Date(g.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString());
    const location = g.venue || "";

    events.push(`
BEGIN:VEVENT
UID:${uid}
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

  // Sort events by start date
  events.sort((a, b) => {
    const aStart = a.match(/DTSTART:(\d+)/)[1];
    const bStart = b.match(/DTSTART:(\d+)/)[1];
    return aStart.localeCompare(bStart);
  });

  fs.writeFileSync("public/top25.ics", buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
