// scripts/generateTop25.mjs
import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const API_KEY = process.env.CBB_API_KEY;
if (!API_KEY) throw new Error("Missing CBB_API_KEY");

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

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

// 1️⃣ Get Top 25 teams from CollegeBasketballData
async function getTop25Teams() {
  const res = await fetch(`https://api.collegebasketballdata.com/rankings?year=${new Date().getFullYear()}&seasonType=regular`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  const data = await res.json();
  const apTop25 = data.filter(r => r.pollType === "AP Top 25").sort((a,b) => a.ranking - b.ranking).slice(0,25);
  return apTop25.map(t => ({ id: t.teamId, name: t.team, rank: t.ranking }));
}

// 2️⃣ Scrape ESPN team schedule
async function getTeamGames(team) {
  const url = `https://www.espn.com/mens-college-basketball/team/schedule/_/id/${team.id}`;
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const games = [];

    $("table.Table tbody tr").each((i, el) => {
      const tds = $(el).find("td");
      if (tds.length < 2) return;

      const dateStr = $(tds[0]).text().trim();
      const opponentRaw = $(tds[1]).text().trim();

      if (!dateStr || !opponentRaw) return;

      const date = new Date(dateStr);
      if (date < new Date()) return; // future games only

      // Determine home/away
      let homeTeam = team.name;
      let awayTeam = opponentRaw;
      if (opponentRaw.startsWith("@")) {
        homeTeam = opponentRaw.replace("@ ", "");
        awayTeam = team.name;
      } else {
        awayTeam = opponentRaw.replace("vs ", "");
      }

      // Remove ranking symbols if present
      homeTeam = homeTeam.replace(/#\d+ /, "");
      awayTeam = awayTeam.replace(/#\d+ /, "");

      games.push({
        date: date.toISOString(),
        homeTeam,
        awayTeam,
        venue: ""
      });
    });

    return games;
  } catch (err) {
    console.warn(`Failed to fetch games for ${team.name}: ${err.message}`);
    return [];
  }
}

(async () => {
  console.log("Fetching Top 25 teams...");
  const top25 = await getTop25Teams();
  console.log(`Found ${top25.length} Top 25 teams`);

  const top25Names = new Set(top25.map(t => t.name));
  const rankMap = new Map(top25.map(t => [t.name, t.rank]));

  const seen = new Set();
  const events = [];

  console.log("Fetching future games...");
  const teamGamesArrays = await Promise.all(top25.map(t => getTeamGames(t)));
  const allGames = teamGamesArrays.flat();

  console.log(`Total future games fetched: ${allGames.length}`);

  for (const g of allGames) {
    const uid = `ncaa-${g.homeTeam}-${g.awayTeam}-${g.date}`;
    if (seen.has(uid)) continue;

    // Only include if at least one team is Top 25
    if (!top25Names.has(g.homeTeam) && !top25Names.has(g.awayTeam)) continue;
    seen.add(uid);

    const homeRank = rankMap.get(g.homeTeam);
    const awayRank = rankMap.get(g.awayTeam);

    const summary =
      `${homeRank ? "#" + homeRank + " " : ""}${g.homeTeam}` +
      ` vs ` +
      `${awayRank ? "#" + awayRank + " " : ""}${g.awayTeam}`;

    const start = formatDate(g.date);
    const end = formatDate(new Date(new Date(g.date).getTime() + 2*60*60*1000));

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

  events.sort((a,b)=>a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1]));

  fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
