import fs from "fs";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

async function sendErrorEmail(team, espnName, status) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set — cannot send alert email.");
    return;
  }

  let transporter = nodemailer.createTransport({
    service: "gmail", // or another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Top 25 Bot" <${process.env.EMAIL_USER}>`,
    to: "your-email@example.com", // put your email here
    subject: `400 Error fetching ESPN team: ${team.name}`,
    text: `Failed to fetch ESPN team for ${team.name} (${espnName}) — status ${status}`,
  });

  console.log("Alert email sent:", info.messageId);
}

const PUBLIC_DIR = "public";
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// normalize team names for matching
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

  const SEASON = 2026;

  // 1️⃣ Fetch all AP rankings for the season
  const res = await fetch(
    `https://api.collegebasketballdata.com/rankings?season=${SEASON}&seasonType=regular&pollType=ap`,
    {
      headers: { Authorization: `Bearer ${process.env.CBB_API_KEY}` },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch Top 25: ${res.status}`);

  const allData = await res.json();

  // 2️⃣ Find latest available week
  const latestWeek = Math.max(...allData.map(r => r.week));
  console.log(`Latest AP poll week detected: Week ${latestWeek}`);

  // 3️⃣ Filter to latest week only
  const latestWeekData = allData
    .filter(r => r.week === latestWeek)
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25);

  const teams = latestWeekData.map(t => ({
    rank: t.ranking,
    name: t.team,
    norm: normalize(t.team),
  }));

  console.log("AP Top 25 grabbed from CBBD:");
  teams.forEach(t => console.log(`#${t.rank} – ${t.name}`));

  return teams;
}

/* ---------------- GET TEAM FUTURE GAMES ---------------- */
async function getTeamGames(team) {
  // Fallback map for tricky ESPN team URLs
  const fallback = {
    "st johns": "2599",
    "north carolina": "unc",
    "unc": "unc",
    "texas tech": "texastech",
    "iowa state": "iowast",
    "michigan state": "michiganst",
    "pittsburgh": "pitt",
    "miami oh": "193",
    "saint louis": "139",
  };

  const espnName = fallback[team.norm] || team.norm;
  const teamUrl = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${espnName}`;

  try {
    const res = await fetch(teamUrl);
    if (!res.ok) {
      if (res.status === 400) {
        console.log(`400 Error fetching ESPN team for: ${team.name} (${espnName})`);
        await sendErrorEmail(team, espnName, res.status); // <-- add this
      }
      throw new Error(`Failed to fetch ESPN team: ${res.status}`);
    }

    const data = await res.json();
    const teamId = data.team?.id;
    if (!teamId) throw new Error("No team ID found");

    const scheduleUrl = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`;
    const scheduleRes = await fetch(scheduleUrl);
    if (!scheduleRes.ok) throw new Error(`Failed to fetch schedule: ${scheduleRes.status}`);
    const scheduleData = await scheduleRes.json();

    const now = new Date();
    const games = [];

    for (const e of scheduleData.events ?? []) {
      const comp = e.competitions?.[0];
      if (!comp) continue;
    
      const home = comp.competitors.find(c => c.homeAway === "home")?.team?.shortDisplayName;
      const away = comp.competitors.find(c => c.homeAway === "away")?.team?.shortDisplayName;
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
    const top25Set = new Set(top25.map(t => t.name));
    const rankMap = new Map(top25.map(t => [t.name, t.rank]));

    console.log("Fetching future games for Top 25 teams...");
    const allGamesArrays = await Promise.all(top25.map(t => getTeamGames(t)));
    let allGames = allGamesArrays.flat();

    // Only keep games with at least one Top 25 team
    allGames = allGames.filter(g => top25Set.has(g.homeName) || top25Set.has(g.awayName));

    // Remove duplicates
    const seen = new Set();
    const events = [];

    for (const g of allGames) {
      const uid = `${g.homeName}-${g.awayName}-${g.date.toISOString()}`;
      if (seen.has(uid)) continue;
      seen.add(uid);

      const start = g.date;
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      const summary =
        `${rankMap.get(g.awayName) ? "#" + rankMap.get(g.awayName) + " " : ""}${g.awayName} @ ` +
        `${rankMap.get(g.homeName) ? "#" + rankMap.get(g.homeName) + " " : ""}${g.homeName}`;

      events.push(`BEGIN:VEVENT
UID:${uid}@borderbarrels
DTSTAMP:${formatICSDate(start)}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
END:VEVENT`);
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
