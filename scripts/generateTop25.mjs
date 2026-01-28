import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
${events.join("\n")}
END:VCALENDAR`;
}

/* ---------------- GET TOP 25 TEAMS ---------------- */
async function getTop25Teams() {
  console.log("Fetching Top 25 from CollegeBasketballData.com...");

  if (!process.env.CBB_API_KEY) {
    throw new Error("CBB_API_KEY not set in environment");
  }

  const res = await fetch(
    `https://api.collegebasketballdata.com/rankings?year=${new Date().getFullYear()}&seasonType=regular&week=1`,
    {
      headers: { Authorization: `Bearer ${process.env.CBB_API_KEY}` },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch Top 25: ${res.status}`);

  const data = await res.json();
  const apTop25 = data.filter(r => r.pollType === "AP Top 25").slice(0, 25);

  return apTop25.map(t => ({
    rank: t.ranking,
    name: t.team,
    norm: normalize(t.team),
  }));
}

/* ---------------- GET ESPN TEAM MAP ---------------- */
async function getESPNTeamsMap() {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams"
  );
  const data = await res.json();
  const map = new Map();

  for (const league of data.sports[0].leagues) {
    for (const conf of league.conferences) {
      for (const teamObj of conf.teams) {
        const team = teamObj.team;
        map.set(normalize(team.displayName), team);
      }
    }
  }
  return map; // key = normalized name, value = { id, displayName, ... }
}

/* ---------------- GET TEAM FUTURE GAMES ---------------- */
async function getTeamGames(team, espnMap) {
  const espnTeam = espnMap.get(team.norm);
  if (!espnTeam) {
    console.warn("No ESPN match for", team.name);
    return [];
  }

  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${espnTeam.id}/schedule`;
  console.log(`Fetching schedule for ${team.name} from ${url}`);

  try {
    const res = await fetch(url);
    const data = await res.json();

    const now = new Date();
    const games = [];

    for (const e of data.events ?? []) {
      const comp = e.competitions?.[0];
      if (!comp) continue;

      const home = comp.competitors.find(c => c.homeAway === "home")?.team?.displayName;
      const away = comp.competitors.find(c => c.homeAway === "away")?.team?.displayName;
      if (!home || !away) continue;

      const gameDate = new Date(e.date);
      if (isNaN(gameDate) || gameDate < now || gameDate > END_DATE) continue;

      games.push({
        id: e.id,
        date: gameDate,
        homeName: home,
        awayName: away,
      });
    }

    console.log(`  Found ${games.length} future games for ${team.name}`);
    return games;
  } catch (err) {
    console.warn(`Failed to fetch games for ${team.name}: ${err.message}`);
    return [];
  }
}

/* ---------------- MAIN ---------------- */
(async () => {
  try {
    const top25 = await getTop25Teams();
    console.log(`Found ${top25.length} Top 25 teams`);

    const espnMap = await getESPNTeamsMap();
    console.log("Fetched ESPN team map");

    console.log("Fetching future games for Top 25 teams...");
    const allGamesArrays = await Promise.all(top25.map(t => getTeamGames(t, espnMap)));
    let allGames = allGamesArrays.flat();

    const top25Set = new Set(top25.map(t => t.name));
    allGames = allGames.filter(g => top25Set.has(g.homeName) || top25Set.has(g.awayName));

    const seen = new Set();
    const rankMap = new Map(top25.map(t => [t.name, t.rank]));
    const events = [];

    for (const g of allGames) {
      const uid = `${g.homeName}-${g.awayName}-${g.date.toISOString()}`;
      if (seen.has(uid)) continue;
      seen.add(uid);

      const start = g.date;
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      const summary =
        `${rankMap.get(g.awayName) ? "#" + rankMap.get(g.awayName) + " " : ""}${g.awayName} vs ` +
        `${rankMap.get(g.homeName) ? "#" + rankMap.get(g.homeName) + " " : ""}${g.homeName}`;

      events.push(`
BEGIN:VEVENT
UID:${uid}@borderbarrels
DTSTAMP:${formatICSDate(start)}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
END:VEVENT
`);
    }

    events.sort((a, b) =>
      a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
    );

    fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
    console.log(`Generated ${events.length} Top 25 events`);
  } catch (err) {
    console.error("Error generating Top 25 ICS:", err);
  }
})();
