import fs from "fs";

const OUTPUT_FILE = "top25.ics";

/* ---------- helpers ---------- */

async function fetchJSON(url, { allow400 = false } = {}) {
  const res = await fetch(url);

  if (res.status === 400 && allow400) return null;

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${url}`);
  }

  return res.json();
}

/* ---------- get AP Top 25 from ESPN ---------- */

async function getTop25Teams() {
  const url =
    "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/rankings";

  const data = await fetchJSON(url);

  const apPoll = data.rankings.find(r => r.name === "AP Top 25");

  return apPoll.ranks
    .filter(r => r.rank <= 25)
    .map(r => ({
      name: r.team.displayName,
      id: r.team.id
    }));
}

/* ---------- schedules ---------- */

async function getTeamGamesESPN(teamId) {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/college-men/teams/${teamId}/schedule`;

  const data = await fetchJSON(url, { allow400: true });
  if (!data || !data.events) return [];

  return data.events;
}

/* ---------- ICS ---------- */

function toICSDate(dateStr) {
  return new Date(dateStr).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/* ---------- main ---------- */

const top25 = await getTop25Teams();
const teamIds = new Set(top25.map(t => t.id));

const gamesById = new Map();

await Promise.all(
  [...teamIds].map(async teamId => {
    const games = await getTeamGamesESPN(teamId);

    for (const game of games) {
      if (!game.date) continue;
      if (new Date(game.date) < new Date()) continue;

      const homeId = game.competitions[0].competitors.find(c => c.homeAway === "home")?.team?.id;
      const awayId = game.competitions[0].competitors.find(c => c.homeAway === "away")?.team?.id;

      // Only include games involving a Top 25 team
      if (!teamIds.has(homeId) && !teamIds.has(awayId)) continue;

      gamesById.set(game.id, game); // dedupe here
    }
  })
);

/* ---------- build ICS ---------- */

let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Top 25 NCAAB//EN
CALSCALE:GREGORIAN
`;

for (const game of gamesById.values()) {
  const comp = game.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === "home").team.displayName;
  const away = comp.competitors.find(c => c.homeAway === "away").team.displayName;

  ics += `BEGIN:VEVENT
UID:${game.id}@top25
DTSTAMP:${toICSDate(game.date)}
DTSTART:${toICSDate(game.date)}
SUMMARY:${away} @ ${home}
END:VEVENT
`;
}

ics += "END:VCALENDAR";

fs.writeFileSync(OUTPUT_FILE, ics);

console.log(`Generated ${gamesById.size} events for Top 25 games`);
