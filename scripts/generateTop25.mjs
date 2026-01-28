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

  console.log("Using CBBD API key:", process.env.CBBD_API_KEY ? "yes" : "no");
  
  const res = await fetch(
    `https://api.collegebasketballdata.com/rankings?year=${new Date().getFullYear()}&seasonType=regular&week=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CBB_API_KEY}`, // <--- Put your API key in GitHub Secrets
      },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch Top 25: ${res.status}`);

  const data = await res.json();
  const apTop25 = data.filter(r => r.pollType === "AP Top 25").slice(0, 25);

  return apTop25.map(t => ({
    rank: t.ranking,
    name: t.team,
  }));
}

/* ---------------- GET TEAM FUTURE GAMES FROM ESPN ---------------- */

async function getTeamGames(team) {
  const normName = team.norm;
  const url = `https://www.espn.com/mens-college-basketball/team/_/id/${team.id}/${team.name.replace(/\s+/g, "-").toLowerCase()}`;
  console.log(`Fetching schedule for ${team.name} from ${url}`);

  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const $ = cheerio.load(html);

    const games = [];

    $("section.Schedule__Games tbody tr").each((_, row) => {
      const tds = $(row).find("td");
      if (tds.length < 2) return;

      const dateText = $(tds[0]).text().trim();
      const opponentText = $(tds[1]).text().trim();
      if (!dateText || !opponentText) return;

      const gameDate = new Date(dateText);
      if (isNaN(gameDate.getTime()) || gameDate > END_DATE) return;

      // Determine home/away
      let homeName, awayName;
      if (opponentText.startsWith("@")) {
        homeName = opponentText.replace("@", "").trim();
        awayName = team.name;
      } else if (opponentText.startsWith("vs")) {
        homeName = team.name;
        awayName = opponentText.replace("vs", "").trim();
      } else {
        homeName = team.name;
        awayName = opponentText;
      }

      games.push({ id: `${team.name}-${gameDate.toISOString()}`, date: gameDate, homeName, awayName });
    });

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
    const top25Set = new Set(top25.map(t => t.name));
    const rankMap = new Map(top25.map(t => [t.name, t.rank]));

    console.log("Fetching future games for Top 25 teams...");
    const allGamesArrays = await Promise.all(top25.map(t => getTeamGames(t)));
    let allGames = allGamesArrays.flat();

    // Only keep games with at least one Top 25 team
    allGames = allGames.filter(g => top25Set.has(g.homeName) || top25Set.has(g.awayName));

    // Remove duplicates (same home/away/date)
    const seen = new Set();
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
