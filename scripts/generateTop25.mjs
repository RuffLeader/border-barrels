import fs from "fs";

const BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/college-men";

// ensure public folder
if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status} for ${url}`);
  return res.json();
}

// format date for ICS
function formatDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// build calendar
function buildICS(events) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
${events.join("\n")}
END:VCALENDAR`;
}

// get AP Top 25 teams
async function getTop25Teams() {
  const data = await fetchJSON(`${BASE}/rankings`);
  const ap = data.rankings.find(r => r.type === "AP Top 25");
  if (!ap) throw new Error("AP Top 25 not found");

  return ap.ranks.map(r => ({
    id: r.team.id,
    name: r.team.displayName,
    rank: r.rank
  }));
}

// get scoreboards for next N days
async function getUpcomingGames(days = 10) {
  const games = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0].replace(/-/g, "");

    const sb = await fetchJSON(`${BASE}/scoreboard?dates=${dateStr}`);
    sb.events?.forEach(e => games.push(e));
  }

  return games;
}

(async () => {
  const top25 = await getTop25Teams();
  const top25Ids = new Set(top25.map(t => t.id));
  const rankMap = new Map(top25.map(t => [t.id, t.rank]));

  const games = await getUpcomingGames(14);

  const seen = new Set();
  const events = [];

  for (const g of games) {
    const comp = g.competitions?.[0];
    if (!comp) continue;

    const home = comp.competitors.find(c => c.homeAway === "home");
    const away = comp.competitors.find(c => c.homeAway === "away");
    if (!home || !away) continue;

    const homeId = home.team.id;
    const awayId = away.team.id;

    // only games involving Top 25
    if (!top25Ids.has(homeId) && !top25Ids.has(awayId)) continue;

    const uid = `ncaa-${g.id}@borderbarrels`;
    if (seen.has(uid)) continue;
    seen.add(uid);

    const homeRank = rankMap.get(homeId);
    const awayRank = rankMap.get(awayId);

    const summary =
      `${homeRank ? "#" + homeRank + " " : ""}${home.team.displayName}` +
      ` vs ` +
      `${awayRank ? "#" + awayRank + " " : ""}${away.team.displayName}`;

    const start = formatDate(g.date);
    const end = formatDate(new Date(new Date(g.date).getTime() + 2 * 60 * 60 * 1000));

    events.push(`
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:AP Top 25 Game
LOCATION:${comp.venue?.fullName || ""}
END:VEVENT
`);
  }

  events.sort((a, b) =>
    a.match(/DTSTART:(\d+)/)[1].localeCompare(
      b.match(/DTSTART:(\d+)/)[1]
    )
  );

  fs.writeFileSync("public/top25.ics", buildICS(events));
  console.log(`Generated ${events.length} events for Top 25 games`);
})();
