import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const CBB_API_KEY = process.env.CBB_API_KEY;
if (!CBB_API_KEY) throw new Error("Missing CBB_API_KEY");

function formatDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
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

// 1️⃣ Get Top 25 teams from CollegeBasketballData.com
async function getTop25Teams() {
  const res = await fetch("https://api.collegebasketballdata.com/rankings", {
    headers: { Authorization: `Bearer ${CBB_API_KEY}` },
  });
  const data = await res.json();
  const top25 = data.filter(r => r.pollType === "AP Top 25").sort((a,b)=>a.ranking-b.ranking).slice(0,25);
  return top25.map(t => ({ id: t.teamId, name: t.team, rank: t.ranking }));
}

// 2️⃣ Get future schedule from PlainTextSports
async function getFutureGames() {
  const res = await fetch("https://plaintextsports.com/ncaa-mb/");
  const html = await res.text();
  const $ = cheerio.load(html);

  const today = new Date();
  const endDate = new Date(today.getFullYear(), 5, 30); // June 30th
  const games = [];

  // PlainTextSports uses a <pre> block
  $("pre").first().text().split("\n").forEach(line => {
    // Example line format: "Jan 05  Duke @ Virginia Tech 7:00 PM"
    const match = line.match(/([A-Za-z]{3} \d{2})\s+(.+?)\s+@\s+(.+?)\s+(\d{1,2}:\d{2} [AP]M)/);
    if (match) {
      const [_, dateStr, home, away, timeStr] = match;
      const year = today.getFullYear();
      const date = new Date(`${dateStr} ${year} ${timeStr}`);
      if (date < today || date > endDate) return;
      games.push({ date, home, away });
    }
  });

  return games;
}

(async () => {
  console.log("Fetching Top 25 teams...");
  const top25 = await getTop25Teams();
  console.log(`Found ${top25.length} Top 25 teams`);

  const top25Set = new Set(top25.map(t => t.name.toLowerCase()));
  const rankMap = new Map(top25.map(t => [t.name.toLowerCase(), t.rank]));

  console.log("Fetching future games...");
  const allGames = await getFutureGames();
  console.log(`Total future games fetched: ${allGames.length}`);

  const seen = new Set();
  const events = [];

  for (const g of allGames) {
    const homeId = g.home.toLowerCase();
    const awayId = g.away.toLowerCase();
    if (!top25Set.has(homeId) && !top25Set.has(awayId)) continue; // skip non-Top25 games

    // deduplicate Top 25 vs Top 25
    const uid = `ncaa-${[homeId, awayId].sort().join("-")}-${g.date.getTime()}`;
    if (seen.has(uid)) continue;
    seen.add(uid);

    const homeRank = rankMap.get(homeId);
    const awayRank = rankMap.get(awayId);

    const summary =
      `${homeRank ? "#" + homeRank + " " : ""}${g.home}` +
      ` vs ` +
      `${awayRank ? "#" + awayRank + " " : ""}${g.away}`;

    const start = formatDate(g.date);
    const end = formatDate(new Date(g.date.getTime() + 2 * 60 * 60 * 1000));

    events.push(`BEGIN:VEVENT
UID:${uid}
SEQUENCE:0
STATUS:CONFIRMED
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:
END:VEVENT
`);
  }

  events.sort((a,b)=>a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1]));

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
