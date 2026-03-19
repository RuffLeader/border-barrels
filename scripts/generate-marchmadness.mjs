import fs from "fs";
import fetch from "node-fetch";

/* ---------------- CONFIG ---------------- */
const GENERATED_AT = new Date();

// Kayo
const KAYO_FILE = "kayo.json";
let kayoGames = {};
if (fs.existsSync(KAYO_FILE)) {
  kayoGames = JSON.parse(fs.readFileSync(KAYO_FILE, "utf-8"));
  console.log(`Loaded ${Object.keys(kayoGames).length} Kayo game(s) from ${KAYO_FILE}`);
}

// Persistent sequence counter — increments on every run so Google Calendar
// detects that events have changed even when game details are identical
const STATE_FILE = "marchmadness-state.json";
let state = { sequence: 0 };
if (fs.existsSync(STATE_FILE)) {
  state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
}
const RUN_SEQUENCE = (state.sequence ?? 0) + 1;
console.log(`Run sequence: ${RUN_SEQUENCE}`);

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

function normalizeForUID(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//March Madness 2026//EN
CALSCALE:GREGORIAN
X-WR-CALNAME:March Madness 2026
X-WR-CALDESC:Last updated ${formatMelbourneDate(GENERATED_AT)} (Melbourne time) — March Madness 2026
X-BORDERBARRELS-GENERATED:${formatICSDate(GENERATED_AT)}
X-CALENDAR-VERSION:${CAL_VERSION}
${events.join("\n")}
END:VCALENDAR`;
}

/* -------------------------------------------------- */
/* TEAM LIST — edit seeds/ESPN slugs/display names here */
/* -------------------------------------------------- */
const TEAMS = [
  // EAST
  { seed: 1,  espn: "150",          name: "Duke",              region: "East" },
  { seed: 2,  espn: "41",           name: "UConn",             region: "East" },
  { seed: 3,  espn: "127",          name: "Michigan State",    region: "East" },
  { seed: 4,  espn: "2305",         name: "Kansas",            region: "East" },
  { seed: 5,  espn: "2599",         name: "St. John's",        region: "East" },
  { seed: 6,  espn: "97",           name: "Louisville",        region: "East" },
  { seed: 7,  espn: "26",           name: "UCLA",              region: "East" },
  { seed: 8,  espn: "194",          name: "Ohio State",        region: "East" },
  { seed: 9,  espn: "2628",         name: "TCU",               region: "East" },
  { seed: 10, espn: "2116",         name: "UCF",               region: "East" },
  { seed: 11, espn: "58",           name: "South Florida",     region: "East" },
  { seed: 12, espn: "2460",         name: "Northern Iowa",     region: "East" },
  { seed: 13, espn: "2856",         name: "California Baptist",region: "East" },
  { seed: 14, espn: "2449",         name: "North Dakota State",region: "East" },
  { seed: 15, espn: "231",          name: "Furman",            region: "East" },
  { seed: 16, espn: "2561",         name: "Siena",             region: "East" },

  // WEST
  { seed: 1,  espn: "12",           name: "Arizona",                    region: "West" },
  { seed: 2,  espn: "2509",         name: "Purdue",                     region: "West" },
  { seed: 3,  espn: "2250",         name: "Gonzaga",                    region: "West" },
  { seed: 4,  espn: "8",            name: "Arkansas",                   region: "West" },
  { seed: 5,  espn: "275",          name: "Wisconsin",                  region: "West" },
  { seed: 6,  espn: "252",          name: "BYU",                        region: "West" },
  { seed: 7,  espn: "2390",         name: "Miami",                      region: "West" },
  { seed: 8,  espn: "222",          name: "Villanova",                  region: "West" },
  { seed: 9,  espn: "328",          name: "Utah State",                 region: "West" },
  { seed: 10, espn: "142",          name: "Missouri",                   region: "West" },
  { seed: 11, espn: "251",          name: "Texas",                      region: "West" },
  { seed: 12, espn: "2272",         name: "High Point",                 region: "West" },
  { seed: 13, espn: "62",           name: "Hawai'i",                    region: "West" },
  { seed: 14, espn: "338",          name: "Kennesaw State",             region: "West" },
  { seed: 15, espn: "2511",         name: "Queens University",          region: "West" },
  { seed: 16, espn: "112358",       name: "Long Island University",     region: "West" },

  // SOUTH
  { seed: 1,  espn: "57",           name: "Florida",           region: "South" },
  { seed: 2,  espn: "248",          name: "Houston",           region: "South" },
  { seed: 3,  espn: "356",          name: "Illinois",          region: "South" },
  { seed: 4,  espn: "158",          name: "Nebraska",          region: "South" },
  { seed: 5,  espn: "238",          name: "Vanderbilt",        region: "South" },
  { seed: 6,  espn: "153",          name: "North Carolina",    region: "South" },
  { seed: 7,  espn: "2608",         name: "Saint Mary's",      region: "South" },
  { seed: 8,  espn: "228",          name: "Clemson",           region: "South" },
  { seed: 9,  espn: "2294",         name: "Iowa",              region: "South" },
  { seed: 10, espn: "245",          name: "Texas A&M",         region: "South" },
  { seed: 11, espn: "2670",         name: "VCU",               region: "South" },
  { seed: 12, espn: "2377",         name: "McNeese",           region: "South" },
  { seed: 13, espn: "2653",         name: "Troy",              region: "South" },
  { seed: 14, espn: "219",          name: "Pennsylvania",      region: "South" },
  { seed: 15, espn: "70",           name: "Idaho",             region: "South" },
  { seed: 16, espn: "2504",         name: "Prairie View A&M",  region: "South" },

  // MIDWEST
  { seed: 1,  espn: "130",          name: "Michigan",          region: "Midwest" },
  { seed: 2,  espn: "66",           name: "Iowa State",        region: "Midwest" },
  { seed: 3,  espn: "258",          name: "Virginia",          region: "Midwest" },
  { seed: 4,  espn: "333",          name: "Alabama",           region: "Midwest" },
  { seed: 5,  espn: "2641",         name: "Texas Tech",        region: "Midwest" },
  { seed: 6,  espn: "2633",         name: "Tennessee",         region: "Midwest" },
  { seed: 7,  espn: "96",           name: "Kentucky",          region: "Midwest" },
  { seed: 8,  espn: "61",           name: "Georgia",           region: "Midwest" },
  { seed: 9,  espn: "139",          name: "Saint Louis",       region: "Midwest" },
  { seed: 10, espn: "2541",         name: "Santa Clara",       region: "Midwest" },
  { seed: 11, espn: "193",          name: "Miami (OH)",        region: "Midwest" },
  { seed: 12, espn: "2006",         name: "Akron",             region: "Midwest" },
  { seed: 13, espn: "2275",         name: "Hofstra",           region: "Midwest" },
  { seed: 14, espn: "2750",         name: "Wright State",      region: "Midwest" },
  { seed: 15, espn: "2634",         name: "Tennessee State",   region: "Midwest" },
  { seed: 16, espn: "47",           name: "Howard",            region: "Midwest" },
];

/* ---------------- GET TEAM GAMES ---------------- */
async function getTeamGames(team) {
  const teamUrl = `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${team.espn}`;

  try {
    const res = await fetch(teamUrl);
    if (!res.ok) {
      console.warn(`[${team.name}] ESPN team lookup failed: HTTP ${res.status} (slug: "${team.espn}")`);
      return [];
    }

    const data = await res.json();
    const teamId = data.team?.id;
    if (!teamId) {
      console.warn(`[${team.name}] No team ID found in ESPN response`);
      return [];
    }

    const scheduleRes = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`
    );
    if (!scheduleRes.ok) {
      console.warn(`[${team.name}] Schedule fetch failed: HTTP ${scheduleRes.status}`);
      return [];
    }

    const scheduleData = await scheduleRes.json();
    const now = new Date();
    const games = [];

    for (const e of scheduleData.events ?? []) {
      const comp = e.competitions?.[0];
      if (!comp) continue;

      const homeComp = comp.competitors.find(c => c.homeAway === "home");
      const awayComp = comp.competitors.find(c => c.homeAway === "away");
      if (!homeComp || !awayComp) continue;

      const gameDate = new Date(e.date);
      if (isNaN(gameDate) || gameDate < now) continue;

      const notes = e.notes ?? [];
      const isTournament = notes.some(n =>
        /march madness|ncaa tournament|ncaa championship/i.test(n.headline ?? "")
      );

      const month = gameDate.getMonth(); // 0-indexed: 2=March, 3=April
      if (!isTournament && month !== 2 && month !== 3) continue;

      games.push({
        date: gameDate,
        homeName: homeComp.team?.displayName ?? homeComp.team?.shortDisplayName,
        awayName: awayComp.team?.displayName ?? awayComp.team?.shortDisplayName,
        sourceTeam: team,
      });
    }

    console.log(`[${team.name}] Found ${games.length} upcoming game(s)`);
    return games;
  } catch (err) {
    console.warn(`[${team.name}] Error: ${err.message}`);
    return [];
  }
}

/* ---------------- MAIN ---------------- */
(async () => {
  try {
    console.log(`Fetching schedules for ${TEAMS.length} March Madness teams...`);

    const allGames = (await Promise.all(TEAMS.map(getTeamGames))).flat();

    const nameMap = new Map(TEAMS.map(t => [t.name.toLowerCase(), t]));

    function findEntry(espnDisplayName) {
      if (!espnDisplayName) return null;
      const lower = espnDisplayName.toLowerCase();
      for (const [, entry] of nameMap) {
        if (lower.includes(entry.name.toLowerCase()) || entry.name.toLowerCase().includes(lower)) {
          return entry;
        }
      }
      return null;
    }

    const seen = new Set();
    const events = [];

    for (const g of allGames) {
      const homeUid = normalizeForUID(g.homeName ?? "home");
      const awayUid = normalizeForUID(g.awayName ?? "away");
      const dateStr = formatICSDate(g.date).slice(0, 8);
      const uid = `marchmadness-${dateStr}-${awayUid}-vs-${homeUid}@borderbarrels`;

      if (seen.has(uid)) continue;
      seen.add(uid);

      const start = g.date;
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

      const homeEntry = findEntry(g.homeName);
      const awayEntry = findEntry(g.awayName);

      const homeLabel = homeEntry ? `(${homeEntry.seed}) ${homeEntry.name}` : g.homeName;
      const awayLabel = awayEntry ? `(${awayEntry.seed}) ${awayEntry.name}` : g.awayName;

      // Kayo lookup
      const kayoKey = `${homeUid}-${awayUid}`;
      const isOnKayo = !!kayoGames[kayoKey];

      const summary = isOnKayo
        ? `🎥 KAYO - ${awayLabel} vs ${homeLabel}`
        : `${awayLabel} vs ${homeLabel}`;

      // Sequence: base is the persistent run counter; Kayo events get +1 on top
      // so a Kayo flag addition is still detectable as a distinct change
      const sequence = RUN_SEQUENCE + (isOnKayo ? 1 : 0);

      const regionParts = [];
      if (homeEntry?.region) regionParts.push(homeEntry.region);
      else if (awayEntry?.region) regionParts.push(awayEntry.region);
      const description = regionParts.length
        ? `March Madness 2026 — ${regionParts[0]} Region`
        : "March Madness 2026";

      events.push(`BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(GENERATED_AT)}
LAST-MODIFIED:${formatICSDate(GENERATED_AT)}
SEQUENCE:${sequence}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:${description}
END:VEVENT`);
    }

    events.sort((a, b) =>
      a.match(/DTSTART:(\d+)/)[1].localeCompare(b.match(/DTSTART:(\d+)/)[1])
    );

    fs.writeFileSync("marchmadness.ics", buildICS(events));

    // Save updated sequence counter for next run
    fs.writeFileSync(STATE_FILE, JSON.stringify({ sequence: RUN_SEQUENCE }, null, 2));

    console.log(`\n✅ Generated ${events.length} March Madness events → marchmadness.ics`);
    console.log(`📅 Calendar version: ${CAL_VERSION}`);
    console.log(`🔢 Sequence: ${RUN_SEQUENCE}`);
    console.log(`🕐 Generated at: ${formatMelbourneDate(GENERATED_AT)} (Melbourne time)`);
  } catch (err) {
    console.error("Error generating March Madness ICS:", err);
    process.exit(1);
  }
})();
