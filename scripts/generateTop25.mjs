// scripts/generateTop25.mjs
import fs from "fs";

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball";

// ensure public folder exists
if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status} for ${url}`);
  return res.json();
}

// Format date for ICS
function formatDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Build ICS content
function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

// Get Top 25 teams from scoreboard
async function getTop25Teams() {
  const data = await fetchJSON(`${ESPN_BASE}/scoreboard`);
  const teamsMap = new Map();

  for (const event of data.events ?? []) {
    for (const comp of event.competitions ?? []) {
      for (const c of comp.competitors ?? []) {
        if (c.team?.rank && c.team.rank <= 25) {
          teamsMap.set(c.team.id, {
            id: c.team.id,
            name: c.team.displayName,
            rank: c.team.rank
          });
        }
      }
    }
  }

  return [...teamsMap.values()].sort((a, b) => a.rank - b.rank);
}

// Get future games for a team
async function getTeamFutureGames(team) {
  const url = `${ESPN_BASE}/teams/${team.id}/schedule`;
  const data = await fetchJSON(url);

  const now = new Date();

  return (data.events ?? [])
    .filter(e => new Date(e.date) > now)
    .map(e => {
      const comp = e.competitions[0];
      const home = comp.competitors.find(c => c.homeAway === "home");
      const away = comp.competitors.find(c => c.homeAway === "away");

      return {
        id: e.id,
        date: e.date,
        homeId: home.team.id,
        homeName: home.team.displayName,
        awayId: away.team.id,
        awayName: away.team.displayName,
        venue: comp.venue?.fullName || ""
      };
    });
}

(async () => {
  console.log("Fetching Top 25 teams...");
  const top25 = await getTop25Teams();
  const top25Ids = new Set(top25.map(t => t.id));
  const rankMap = new Map(top25.map(t => [t.id, t.rank]));

  console.log(`Found ${top25.length} Top 25 teams`);

  const seen = new Set();
  const events = [];

  for (const team of top25) {
    try {
      const teamGames = await getTeamFutureGames(team);
      for (const g of teamGames) {
        const uid = `ncaa-${g.id}@borderbarrels`;
        if (seen.has(uid)) continue;

        // Only include games where at least one Top 25 team plays
        if (!top25Ids.has(g.homeId) && !top25Ids.has(g.awayId)) continue;

        seen.add(uid);

        const homeRank = rankMap.get(g.homeId);
        const awayRank = rankMap.get(g.awayId);

        const summary =
          `${homeRank ? "#" + homeRank + " " : ""}${g.homeName}` +
          ` vs ` +
          `${awayRank ? "#" + awayRank + " " : ""}${g.awayName}`;

        const start = formatDate(g.date);
        const end = formatDate(new Date(new Date(g.date).getTime() + 2 * 60 * 60 * 1000));

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
LOCATION:${g.venue}
END:VEVENT
`);
      }
    } catch (err) {
      console.warn(`Skipping ${team.name}: ${err.message}`);
    }
  }

  // Sort events by start date
  events.sort((a, b) =>
    a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
  );

  fs.writeFileSync("public/top25.ics", buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
