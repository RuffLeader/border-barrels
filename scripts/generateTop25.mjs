import fs from "fs";

const API_KEY = process.env.CBB_API_KEY;
const BASE = "https://api.collegebasketballdata.com";

if (!API_KEY) {
  throw new Error("Missing CBB_API_KEY");
}

if (!fs.existsSync("docs")) {
  fs.mkdirSync("docs");
}

const headers = {
  Authorization: `Bearer ${API_KEY}`
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${url}`);
  }
  return res.json();
}

// 1️⃣ Get current AP Top 25
async function getTop25Teams() {
  const rankings = await fetchJSON(`${BASE}/rankings`);
  const ap = rankings.find(r => r.poll === "AP Top 25");
  return ap.ranks.map(r => ({
    team: r.school,
    rank: r.rank,
    teamId: r.teamId
  }));
}

// 2️⃣ Get upcoming games for a team
async function getTeamGames(teamId) {
  const today = new Date().toISOString().split("T")[0];
  return fetchJSON(
    `${BASE}/games?teamId=${teamId}&startDate=${today}`
  );
}

// 3️⃣ Build iCal
function buildICS(events) {
  const header = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
`;

  const footer = `END:VCALENDAR`;

  return header + events.join("\n") + footer;
}

function formatDate(dateStr) {
  return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

(async () => {
  const teams = await getTop25Teams();

  const teamMap = new Map();
  teams.forEach(t => teamMap.set(t.teamId, t));

  const seenGames = new Set();
  const events = [];

  for (const team of teams) {
    const games = await getTeamGames(team.teamId);

    for (const g of games) {
      if (!g.startDate || !g.homeTeamId || !g.awayTeamId) continue;

      const uid = `ncaa-${g.id}@borderbarrels`;
      if (seenGames.has(uid)) continue;
      seenGames.add(uid);

      const homeRank = teamMap.get(g.homeTeamId)?.rank;
      const awayRank = teamMap.get(g.awayTeamId)?.rank;

      const summary = `${homeRank ? "#" + homeRank + " " : ""}${g.homeTeam} vs ${awayRank ? "#" + awayRank + " " : ""}${g.awayTeam}`;

      const start = formatDate(g.startDate);
      const end = formatDate(
        new Date(new Date(g.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString()
      );

      events.push(`
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:${g.venue || ""}
END:VEVENT
`);
    }
  }

  const ics = buildICS(events);
  fs.writeFileSync("docs/top25.ics", ics);
})();
