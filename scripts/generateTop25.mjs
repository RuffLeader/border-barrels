import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

/* ---------------- TOP 25 ---------------- */

async function getTop25Teams() {
  const res = await fetch("https://www.espn.com/mens-college-basketball/rankings");
  const html = await res.text();
  const $ = cheerio.load(html);

  const teams = [];
  $(".Table__TR").each((_, row) => {
    const rank = $(row).find(".Table__TD:nth-child(1)").text().trim();
    const name = $(row).find(".Table__TD:nth-child(2) a").text().trim();
    if (rank && name) teams.push({ rank: Number(rank), name });
  });

  return teams.slice(0, 25);
}

/* ---------------- SCHEDULE ---------------- */

async function getFutureGames(top25Set, rankMap) {
  const res = await fetch("https://www.espn.com/mens-college-basketball/schedule");
  const html = await res.text();
  const $ = cheerio.load(html);

  const events = [];
  const seen = new Set();

  $("section.Card").each((_, section) => {
    const dateText = $(section).find("h2").text().trim();
    const gameDate = new Date(dateText);
    if (isNaN(gameDate) || gameDate > END_DATE) return;

    $(section)
      .find("tbody tr")
      .each((_, row) => {
        const teams = $(row).find("td:nth-child(2) a");
        if (teams.length !== 2) return;

        const away = $(teams[0]).text().trim();
        const home = $(teams[1]).text().trim();

        if (!top25Set.has(away) && !top25Set.has(home)) return;

        const uid = `${gameDate.toISOString()}-${away}-${home}`;
        if (seen.has(uid)) return;
        seen.add(uid);

        const summary =
          `${rankMap.get(away) ? "#" + rankMap.get(away) + " " : ""}${away}` +
          " vs " +
          `${rankMap.get(home) ? "#" + rankMap.get(home) + " " : ""}${home}`;

        const start = new Date(gameDate);
        start.setHours(12, 0, 0, 0);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        events.push(`
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(start)}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
END:VEVENT
`);
      });
  });

  return events;
}

/* ---------------- RUN ---------------- */

(async () => {
  console.log("Fetching AP Top 25...");
  const top25 = await getTop25Teams();
  console.log(`Found ${top25.length} teams`);

  const top25Set = new Set(top25.map(t => t.name));
  const rankMap = new Map(top25.map(t => [t.name, t.rank]));

  console.log("Fetching schedule...");
  const events = await getFutureGames(top25Set, rankMap);

  events.sort((a, b) =>
    a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
  );

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} Top 25 events`);
})();
