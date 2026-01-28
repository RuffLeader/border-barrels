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
  return str.toLowerCase().replace(/[^a-z\s]/g, "").trim();
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
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

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
  const res = await fetch("https://www.espn.com/mens-college-basketball/schedule");
  const html = await res.text();
  const $ = cheerio.load(html);

  const events = [];
  const seen = new Set();

  $("table tbody tr").each((_, row) => {
    const dateAttr = $(row).attr("data-date");
    if (!dateAttr) return;

    const gameDate = new Date(dateAttr);
    if (isNaN(gameDate) || gameDate > END_DATE) return;

    const teamLinks = $(row).find("a.AnchorLink");
    if (teamLinks.length < 2) return;

    const away = $(teamLinks[0]).text().trim();
    const home = $(teamLinks[1]).text().trim();

    const awayNorm = normalize(away);
    const homeNorm = normalize(home);

    const awayRank = top25.find(t => t.norm === awayNorm)?.rank;
    const homeRank = top25.find(t => t.norm === homeNorm)?.rank;

    if (!awayRank && !homeRank) return;

    const uid = `${dateAttr}-${awayNorm}-${homeNorm}`;
    if (seen.has(uid)) return;
    seen.add(uid);

    const summary =
      `${awayRank ? "#" + awayRank + " " : ""}${away}` +
      " vs " +
      `${homeRank ? "#" + homeRank + " " : ""}${home}`;

    const start = new Date(gameDate);
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
