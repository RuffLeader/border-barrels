// scripts/generateTop25.mjs
import fs from "fs";
import fetch from "node-fetch";

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const API_KEY = process.env.CBB_API_KEY;
if (!API_KEY) throw new Error("Missing CBB_API_KEY");

function formatDate(dateStr) {
  // Convert to ICS UTC format
  return new Date(dateStr).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
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

// 1️⃣ Get Top 25 teams from CBB API
async function getTop25Teams() {
  const res = await fetch("https://api.collegebasketballdata.com/rankings", {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await res.json();
  const apTop25 = data
    .filter(r => r.pollType === "AP Top 25")
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25);
  return apTop25.map(t => ({ name: t.team, rank: t.ranking }));
}

// 2️⃣ Fetch future schedule from PlainTextSports
async function getFutureGames() {
  const res = await fetch("https://plaintextsports.com/ncaa-mb/");
  const text = await res.text();
  const lines = text.split("\n");

  const today = new Date();

  const games = lines
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      // Expecting format: MM/DD/YYYY | TeamA vs TeamB | HH:MM AM/PM ET
      const parts = line.split("|").map(p => p.trim());
      if (parts.length < 2) return null;
      const [datePart, matchupPart, timePart] = parts;
      const date = new Date(datePart + (timePart ? " " + timePart : ""));
      if (isNaN(date.getTime()) || date < today) return null;

      const vsMatch = matchupPart.match(/(.+)\s+vs\s+(.+)/i);
      if (!vsMatch) return null;

      return {
        date,
        homeName: vsMatch[1].trim(),
        awayName: vsMatch[2].trim(),
        uid: `ncaa-${date.getTime()}-${vsMatch[1]}-${vsMatch[2]}@borderbarrels`,
      };
    })
    .filter(Boolean);

  return games;
}

(async () => {
  console.log("Fetching Top 25 teams...");
  const top25 = await getTop25Teams();
  console.log(`Found ${top25.length} Top 25 teams`);

  const top25Names = new Set(top25.map(t => t.name));
  const rankMap = new Map(top25.map(t => [t.name, t.rank]));

  console.log("Fetching future games...");
  const allGames = await getFutureGames();
  console.log(`Total future games fetched: ${allGames.length}`);

  const seen = new Set();
  const events = [];

  for (const g of allGames) {
    // Only include games with at least one Top 25 team
    if (!top25Names.has(g.homeName) && !top25Names.has(g.awayName)) continue;

    if (seen.has(g.uid)) continue;
    seen.add(g.uid);

    const homeRank = rankMap.get(g.homeName);
    const awayRank = rankMap.get(g.awayName);

    const summary =
      `${homeRank ? "#" + homeRank + " " : ""}${g.homeName}` +
      " vs " +
      `${awayRank ? "#" + awayRank + " " : ""}${g.awayName}`;

    const start = formatDate(g.date);
    const end = formatDate(new Date(g.date.getTime() + 2 * 60 * 60 * 1000));

    events.push(`BEGIN:VEVENT
UID:${g.uid}
SEQUENCE:0
STATUS:CONFIRMED
DTSTAMP:${formatDate(new Date())}
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:
END:VEVENT`);
  }

  events.sort((a, b) =>
    a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
  );

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
