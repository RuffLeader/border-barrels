import fs from "fs";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

/* ---------------- CONFIG ---------------- */
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const END_DATE = new Date(new Date().getFullYear(), 2, 16); // March 16
const GENERATED_AT = new Date();
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
function normalizeForAPI(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

// For UID generation (Google Calendar safe)
function normalizeForUID(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
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

  if (!process.env.CBB_API_KEY) throw new Error("CBB_API_KEY not set in environment");

  const SEASON = 2026;

  const res = await fetch(
    `https://api.collegebasketballdata.com/rankings?season=${SEASON}&seasonType=regular&pollType=ap`,
    { headers: { Authorization: `Bearer ${process.env.CBB_API_KEY}` } }
  );

  if (!res.ok) throw new Error(`Failed to fetch Top 25: ${res.status}`);

  const allData = await res.json();

  const latestWeek = Math.max(
    ...allData.filter(r => r.ranking >= 1 && r.ranking <= 25).map(r => r.week)
  );

  console.log(`Latest AP poll week detected: Week ${latestWeek}`);

  const teams = allData
    .filter(r => r.week === latestWeek && r.pollType === "AP Top 25" && r.ranking >= 1 && r.ranking <= 25)
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 25)
    .map(t => ({
      rank: t.ranking,
      name: t.team,
      norm: normalizeForAPI(t.team),
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

  const espnName = fallback[normalizeForAPI(team.name)] || normalizeForAPI(team.name);
  const teamUrl = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${espnName}`;

  try {
    const res = await fetch(teamUrl);
    if (!res.ok) {
      if (res.status === 400) await sendErrorEmail(team, espnName, res.status);
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

/* ---------------- FETCH KAYO FIXTURES (NEXT 7 DAYS, TOP 25 ONLY) ---------------- */
async function updateKayoGames(top25) {
  const today = new Date();
  const kayoDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Normalize Top 25 team names for string matching
  const top25Names = top25.map(t => t.name.toLowerCase());

  console.log(`Fetching KAYO fixtures for the next 7 days (Top 25 teams only)...`);

  const promises = kayoDates.map(async (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const url = `https://kayosports.com.au/fixtures/day!${yyyy}-${mm}-${dd}`;

    try {
      const res = await fetch(url);
      const html = await res.text();

      // Only match JSON objects that contain "type":"event" AND a Top 25 team
      const matches = html.matchAll(/(\{[^}]*"type":"event"[^}]*\})/g);
      let foundAny = false;

      for (const m of matches) {
        const snippet = m[1].toLowerCase();

        // Skip events that don’t mention a Top 25 team
        if (!top25Names.some(name => snippet.includes(name))) continue;

        try {
          const ev = JSON.parse(m[1]);
          if (!ev.title) continue;

          const teams = ev.title.split(" v ");
          if (teams.length === 2) {
            const uid = `${normalizeForUID(teams[0])}-${normalizeForUID(teams[1])}`;
            kayoGames[uid] = true;
            console.log(`✅ KAYO found: ${teams[0]} vs ${teams[1]} on ${yyyy}-${mm}-${dd}`);
            foundAny = true;
          }
        } catch (err) {
          // ignore individual parse errors
        }
      }

      if (!foundAny) {
        console.warn(`⚠️ No KAYO games found for ${yyyy}-${mm}-${dd}`);
      }
    } catch (err) {
      console.warn(`❌ Failed to fetch KAYO for ${yyyy}-${mm}-${dd}: ${err.message}`);
    }
  });

  await Promise.all(promises);
  console.log(`Finished fetching KAYO fixtures.`);
}


/* ---------------- MAIN ---------------- */
(async () => {
  try {
    // 1️⃣ Fetch KAYO fixtures for next 7 days
    await updateKayoGames(top25);

    // 2️⃣ Fetch Top 25 teams
    const { teams: top25, latestWeek } = await getTop25Teams();

    const RANK_FALLBACK = {
      "st johns": "St. John's",
      "miami oh": "Miami (OH)",
      "michigan st": "Michigan State",
    };
    const rankMap = new Map(top25.map(t => [t.name, t.rank]));

    console.log("Fetching games for these Top 25 teams:");
    top25.forEach(t => console.log(`- ${t.name}`));

    // 3️⃣ Fetch team schedules
    const allGames = (await Promise.all(top25.map(getTeamGames)))
      .flat()
      .filter(g => {
        const homeNorm = normalizeForAPI(RANK_FALLBACK[normalizeForAPI(g.homeName)] || g.homeName);
        const awayNorm = normalizeForAPI(RANK_FALLBACK[normalizeForAPI(g.awayName)] || g.awayName);
        return top25.some(t => normalizeForAPI(t.name) === homeNorm || normalizeForAPI(t.name) === awayNorm);
      });

    const seen = new Set();
    const events = [];

    function getRankedName(name) {
      const norm = normalizeForAPI(name);
      const correctName = RANK_FALLBACK[norm] || name;
      const rank = rankMap.get(correctName);
      return rank ? `#${rank} ${correctName}` : correctName;
    }

    for (const g of allGames) {
      const homeUid = normalizeForUID(g.homeName);
      const awayUid = normalizeForUID(g.awayName);
      const uid = `${homeUid}-${awayUid}@borderbarrels`;

      if (seen.has(uid)) continue;
      seen.add(uid);

      const start = g.date;
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

      let summary = `${getRankedName(g.awayName)} @ ${getRankedName(g.homeName)}`;

      // ✅ Add KAYO prefix if available
      if (kayoGames[`${homeUid}-${awayUid}`]) {
        summary = `🎥 KAYO - ${summary}`;
      }

      events.push(`BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(GENERATED_AT)}
LAST-MODIFIED:${formatICSDate(GENERATED_AT)}
SEQUENCE:0
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
END:VEVENT`);
    }

    events.sort((a, b) =>
      a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
    );

    fs.writeFileSync(`top25.ics`, buildICS(events, latestWeek));
    const ICS_URL = `https://www.borderbarrels.com/top25.ics?v=${CAL_VERSION}`;
    console.log(`Generated ${events.length} Top 25 events — AP Week ${latestWeek}`);
    console.log(`📅 Subscribe URL: ${ICS_URL}`);

    // ---------------- GENERATE HTML ----------------
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Border Barrels Top 25 Calendar</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
  h1 { color: #002157; }
  a.subscribe { display: inline-block; padding: 10px 20px; background: #002157; color: #fff; text-decoration: none; border-radius: 6px; margin-top: 20px; }
  a.subscribe:hover { background: #003377; }
</style>
</head>
<body>
<h1>Border Barrels Top 25 Calendar</h1>
<p>Subscribe to the latest NCAA Top 25 calendar. This link always points to the most up-to-date events.</p>
<a class="subscribe" href="${ICS_URL}" target="_blank">Subscribe to Top 25 Calendar</a>
<p style="margin-top:20px; font-size:0.9em; color:#555;">
Last updated: ${formatMelbourneDate(GENERATED_AT)} (Melbourne time) — AP Poll Week ${latestWeek}
</p>
</body>
</html>
`;
    fs.writeFileSync(`calendar.html`, html);
    console.log("🌐 HTML page generated at calendar.html");

  } catch (err) {
    console.error("Error generating Top 25 ICS:", err);
  }
})();
