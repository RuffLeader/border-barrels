// scripts/generateTop25.mjs
import fs from "fs";
import * as cheerio from "cheerio";
import fetch from "node-fetch";

const BASE_URL = "https://www.espn.com/mens-college-basketball";
const PUBLIC_DIR = "public";

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// Format date for iCal
function formatDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Build iCal file
function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

// 1️⃣ Scrape AP Top 25
async function getTop25Teams() {
  const res = await fetch(`${BASE_URL}/rankings`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const teams = [];

  $("section.rankings__list-item").each((i, el) => {
    if (i >= 25) return;

    const rank = parseInt($(el).find("span.rank").first().text().trim());
    const name = $(el).find("a.AnchorLink").text().trim();
    const teamUrl = $(el).find("a.AnchorLink").attr("href"); // /team/_/id/150/duke-blue-devils
    const match = teamUrl?.match(/\/id\/(\d+)\//);
    const id = match ? parseInt(match[1]) : null;

    if (rank && name && id) {
      teams.push({ id, name, rank });
    }
  });

  return teams;
}

// 2️⃣ Fetch future games for a team
async function getTeamFutureGames(team) {
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${team.id}/schedule`);
    const data = await res.json();
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
  } catch (err) {
    console.warn(`Failed to fetch games for ${team.name}: ${err.message}`);
    return [];
  }
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
    const teamGames = await getTeamFutureGames(team);
    for (const g of teamGames) {
      const uid = `ncaa-${g.id}@borderbarrels`;
      if (seen.has(uid)) continue;

      // Only include games where at least one team is in Top 25
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
  }

  // Sort events by date
  events.sort((a, b) => a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1]));

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
