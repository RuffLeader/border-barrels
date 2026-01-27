import fs from "fs";

const ICS_HEADER = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Border Barrels//NCAA Top 25//EN
CALSCALE:GREGORIAN
REFRESH-INTERVAL;VALUE=DURATION:PT6H
`;

const ICS_FOOTER = `END:VCALENDAR`;

// 🔴 TEMP MOCK DATA (we’ll replace with API calls)
const games = [
  {
    id: "duke-unc-20260212",
    start: "20260212T230000Z",
    end: "20260213T010000Z",
    summary: "#5 Duke vs #12 UNC",
    description: "AP Top 25 Game"
  }
];

let events = games.map(g => `
BEGIN:VEVENT
UID:${g.id}@borderbarrels
DTSTAMP:${g.start}
DTSTART:${g.start}
DTEND:${g.end}
SUMMARY:${g.summary}
DESCRIPTION:${g.description}
END:VEVENT
`).join("");

const ics = `${ICS_HEADER}${events}${ICS_FOOTER}`;

fs.writeFileSync("docs/top25.ics", ics);

