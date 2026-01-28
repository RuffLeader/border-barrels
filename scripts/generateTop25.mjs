import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// normalize names for matching
function normalize(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
${events.join("\n")}
END:VCALENDAR`;
}

/* ---------------- TOP 25 ---------------- */

async function getTop25Teams() {
  const url = "https://www.espn.com.au/mens-college-basketball/rankings";
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const $ = cheerio.load(html);

  const teams = [];

  $("table tbody tr").each((_, row) => {
    const tds = $(row).find("td");
    if (tds.length < 2) return;

    const rank = $(tds[0]).text().trim();
    const name = $(tds[1]).find("a").text().trim();
    if (!rank || !name || isNaN(rank)) return;

    teams.push({
      rank: Number(rank),
      name,
      norm: normalize(name),
    });
  });

  console.log(`Parsed ${teams.length} ranked teams`);
  return teams.slice(0, 25);
}

/* ---------------- SCHEDULE ---------------- */

async function getFutureGames(top25) {
  const events = [];
  const seen = new Set();

  // create set and rank map using normalized names
  const top25Set = new Set(top25.map(t => t.norm));
  const rankMap = new Map(top25.map(t => [t.norm, t.rank]));

  const today = new Date();
  const end = END_DATE;

  for (let d = new Date(today); d <= end; d.setDate(d.getDate() + 1)) {
    const ymd = d.toISOString().slice(0, 10).replace(/-/g, "");

    const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/college-men/scoreboard?dates=${ymd}`;
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const data = await res.json();

      for (const e of data.events ?? []) {
        const comp = e.competitions?.[0];
        if (!comp) continue;

        const teams = comp.competitors;
        if (teams.length !== 2) continue;

        const away = teams.find(t => t.homeAway === "away");
        const home = teams.find(t => t.homeAway === "home");

        // use shortDisplayName and normalize
        const awayName = normalize(away.team.shortDisplayName);
        const homeName = normalize(home.team.shortDisplayName);

        // skip if no Top 25 team involved
        if (!top25Set.has(awayName) && !top25Set.has(homeName)) continue;

        const uid = e.id;
        if (seen.has(uid)) continue;
        seen.add(uid);

        const start = new Date(e.date);
        const endDate = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        const summary =
          `${rankMap.get(awayName) ? "#" + rankMap.get(awayName) + " " : ""}${away.team.shortDisplayName}` +
          " vs " +
          `${rankMap.get(homeName) ? "#" + rankMap.get(homeName) + " " : ""}${home.team.shortDisplayName}`;

        events.push(`
BEGIN:VEVENT
UID:${uid}@borderbarrels
DTSTAMP:${formatICSDate(start)}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:${comp.venue?.fullName || ""}
END:VEVENT
`);
      }
    } catch (err) {
      console.warn(`Failed to fetch games for ${ymd}: ${err.message}`);
    }
  }

  return events;
}

/* ---------------- RUN ---------------- */

(async () => {
  console.log("Fetching AP Top 25...");
  const top25 = await getTop25Teams();
  console.log(`Found ${top25.length} teams`);

  console.log("Fetching schedule...");
  const events = await getFutureGames(top25);

  events.sort((a, b) =>
    a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
  );

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} Top 25 events`);
})();
