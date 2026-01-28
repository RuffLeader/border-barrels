import fs from "fs";

const CBB_API_KEY = process.env.CBB_API_KEY;
const BAL_API_KEY = process.env.BAL_API_KEY;
const BASE_CBB = "https://api.collegebasketballdata.com";
const BASE_BAL = "https://www.balldontlie.io/ncaab/v1";

if (!CBB_API_KEY) throw new Error("Missing CBB_API_KEY");
if (!BAL_API_KEY) throw new Error("Missing BAL_API_KEY");

// Ensure public folder exists
if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });

// --------------------
// Helper: fetch JSON with optional headers
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
    cbbName: r.team.toLowerCase(),
    rank: r.ranking,
    cbbId: r.teamId
  }));
}

// --------------------
// 2️⃣ Get all NCAAB teams from Balldontlie
async function getBalTeams() {
  const data = await fetchJSON(`${BASE_BAL}/teams`, { Authorization: `Bearer ${BAL_API_KEY}` });
  return data.data.map(t => ({
    balId: t.id,
    name: t.full_name.toLowerCase()
  }));
}

// --------------------
// 3️⃣ Map CBB Top 25 teams to Balldontlie IDs automatically
function mapCbbToBal(top25, balTeams) {
  const map = new Map();
  top25.forEach(team => {
    const match = balTeams.find(b => b.name.includes(team.cbbName) || team.cbbName.includes(b.name));
    if (match) map.set(team.cbbId, match.balId);
    else console.warn("No Balldontlie match for:", team.cbbName);
  });
  return map;
}

// --------------------
// 4️⃣ Fetch future games for a Balldontlie team (paginated)
async function getTeamGamesBal(balId) {
  const today = new Date().toISOString().split("T")[0];
  let allGames = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${BASE_BAL}/games?team_ids[]=${balId}&start_date=${today}&per_page=100&page=${page}`;
    const data = await fetchJSON(url, { Authorization: `Bearer ${BAL_API_KEY}` });
    allGames = allGames.concat(data.data);
    totalPages = data.meta.total_pages;
    page++;
  }

  return allGames;
}

// --------------------
// 5️⃣ Format date for iCal
function formatDate(dateStr) {
  return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

// --------------------
// 6️⃣ Build iCal file content
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
// 7️⃣ Main function
(async () => {
  // Fetch Top 25 + Balldontlie teams
  const top25 = await getTop25Teams();
  const balTeams = await getBalTeams();
  const cbbToBal = mapCbbToBal(top25, balTeams);

  // Map for rank lookup
  const rankMap = new Map();
  top25.forEach(t => rankMap.set(t.cbbId, t.rank));

  // Fetch all games in parallel
  const allGamesArrays = await Promise.all(
    Array.from(cbbToBal.values()).map(balId => getTeamGamesBal(balId))
  );
  const allGames = allGamesArrays.flat();

  console.log("Total games fetched:", allGames.length);
  console.log("Sample of first 5 games:", allGames.slice(0, 5));

  const seenGameIds = new Set();
  const events = [];

  for (const g of allGames) {
    if (seenGameIds.has(g.id)) continue;
    seenGameIds.add(g.id);

    // Only include games where at least one team is Top 25
    const homeCbbId = Array.from(cbbToBal.entries()).find(([, val]) => val === g.home_team.id)?.[0];
    const awayCbbId = Array.from(cbbToBal.entries()).find(([, val]) => val === g.visitor_team.id)?.[0];
    if (!homeCbbId && !awayCbbId) continue;

    const homeRank = rankMap.get(Number(homeCbbId));
    const awayRank = rankMap.get(Number(awayCbbId));

    const summary = `${homeRank ? "#" + homeRank + " " : ""}${g.home_team.full_name} vs ${awayRank ? "#" + awayRank + " " : ""}${g.visitor_team.full_name}`;
    const start = formatDate(g.date);
    const end = formatDate(new Date(new Date(g.date).getTime() + 2 * 60 * 60 * 1000).toISOString());
    const location = g.home_team_conference || "";

    events.push(`
BEGIN:VEVENT
UID:bal-${g.id}@borderbarrels
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
