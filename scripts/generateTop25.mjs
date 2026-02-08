import fs from "fs";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

/* ---------------- CONFIG ---------------- */
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const PUBLIC_DIR = "public";
const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16
const GENERATED_AT = new Date(); // single source of truth
const CAL_VERSION = `v${GENERATED_AT.getFullYear()}${(GENERATED_AT.getMonth() + 1)
  .toString()
  .padStart(2, "0")}${GENERATED_AT.getDate().toString().padStart(2, "0")}_${GENERATED_AT
  .getHours()
  .toString()
  .padStart(2, "0")}${GENERATED_AT.getMinutes().toString().padStart(2, "0")}`;

// Melbourne timezone helper
function formatMelbourneDate(date) {
  return date.toLocaleString("en-AU", { timeZone: "Australia/Melbourne" });
}

/* ---------------- HELPERS ---------------- */
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// normalize team names for matching
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function buildICS(events, latestWeek) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:NCAA Top 25 Games
X-WR-CALDESC:Last updated ${formatMelbourneDate(
    GENERATED_AT
  )} (Melbourne time) — AP Poll Week ${latestWeek}
X-BORDERBARRELS-GENERATED:${formatICSDate(GENERATED_AT)}
X-CALENDAR-VERSION:${CAL_VERSION}
${events.join("\n")}
END:VCALENDAR`;
}

/* ---------------- EMAIL ALERT ---------------- */
async function sendErrorEmail(team, espnName, status) {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set — cannot send alert email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Top 25 Bot" <${EMAIL_USER}>`,
    to: "your-email@example.com",
    subject: `400 Error fetching ESPN team: ${team.name}`,
    text: `Failed to fetch ESPN team for ${team.name} (${espnName}) — status ${status}`,
  });

  console.log("Alert email sent:", info.messageId);
}

/* ---------------- GET TOP 25 TEAMS ---------------- */
async function getTop25Teams() {
  console.log("Fetching Top 25 from CollegeBasketballData.com...");

  if (!process.env.CBB_API_KEY) {
    throw new Error("CBB_API_KEY not set in environment");
  }

  const SEASON = 2026;

  const res = await fetch(
    `https://api.collegebasketballdata.com/rankings?season=${SEASON}&seasonType=regular&pollType=ap`,
    { headers: { Authorization: `Bearer ${process.env.CBB_API_KEY}` } }
  );

  if (!res.ok) throw new Error(`Failed to fetch Top 25: ${res.status}`);

  const allData = await res.json();

  const latestWeek = Math.max(
    ...allData
      .filter(r => r.ranking >= 1 && r.ranking <= 25)
      .map(r => r.week)
  );

  console.log(`Latest AP poll week detected: Week ${latestWeek}`);

  const teams = allData
    .filter(
      r =>
        r.week === latestWeek &&
        r.pollType === "AP Top 25" &&
        r.ranking >= 1 &&
        r.ranking <= 25
    )
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25)
    .map(t => ({
      rank: t.ranking,
      name: t.team,
      norm: normalize(t.team),
    }));

  teams.forEach(t => console.log(`#${t.rank} – ${t.name}`));
  return { teams, latestWeek };
}

/* ---------------- GET TEAM FUTURE GAMES ---------------- */
async function getTeamGames(team) {
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
        await sendErrorEmail(team, espnName, res.status);
      }
      throw new Error(`Failed to fetch ESPN team: ${res.status}`);
    }

    const data = await res.json();
    const teamId = data.team?.id;
    if (!teamId) throw new Error("No team ID found");

    const scheduleRes = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`
    );
    if (!scheduleRes.ok) throw new Error(`Failed to fetch schedule`);

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

      games.push({ date: gameDate, homeName: home, awayName: away });
    }

    return games;
  } catch (err) {
    console.warn(`Failed to fetch games for ${team.name}: ${err.message}`);
    return [];
  }
}

/* ---------------- MAIN ---------------- */
(async () => {
  try {
    const { teams: top25, latestWeek } = await getTop25Teams();
    const top25Set = new Set(top25.map(t => t.name));
    const rankMap = new Map(top25.map(t => [t.norm, t.rank]));

    const allGames = (await Promise.all(top25.map(getTeamGames)))
      .flat()
      .filter(g => top25Set.has(g.homeName) || top25Set.has(g.awayName));

    const seen = new Set();
    const events = [];

    for (const g of allGames) {
      const uid = `${g.homeName}-${g.awayName}-${g.date.toISOString()}`;
      if (seen.has(uid)) continue;
      seen.add(uid);

      const start = g.date;
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

      const awayNorm = normalize(g.awayName);
      const homeNorm = normalize(g.homeName);
      
      const summary =
        `${rankMap.get(g.awayNorm) ? "#" + rankMap.get(g.awayNorm) + " " : ""}${g.awayName} @ ` +
        `${rankMap.get(g.homeNorm) ? "#" + rankMap.get(g.homeNorm) + " " : ""}${g.homeName}`;

      events.push(`BEGIN:VEVENT
UID:${uid}@borderbarrels
DTSTAMP:${formatICSDate(GENERATED_AT)}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
END:VEVENT`);
    }

    events.sort((a, b) =>
      a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
    );

    fs.writeFileSync(`${PUBLIC_DIR}/top25.ics`, buildICS(events, latestWeek));
    console.log(`Generated ${events.length} Top 25 events — AP Week ${latestWeek}`);
  } catch (err) {
    console.error("Error generating Top 25 ICS:", err);
  }
})();
