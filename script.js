console.log("Border Barrels site loaded!");

const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y";
let allBeers = [];

const columnWidths = {
  "Brewery": "fit-content",
  "Beer Name": "fit-content",
  "ABV": "fit-content",
  "Parent Style": "fit-content",
  "Style": "fit-content",
  "BBBRS Score": "fit-content",
  "Untappd Score": "fit-content",
  "Can Art Score": "fit-content",
  "Episode No.": "fit-content",
  "Supplier": "fit-content",
  "Brewery City": "fit-content",
  "Brewery State": "fit-content",
  "Year Reviewed": "fit-content"
};

const episodeLinks = {
    "1": "https://www.youtube.com/watch?v=riVK2nrD4Kk",
  "2": "https://www.youtube.com/watch?v=aOvtCZfrJJI",
  "3": "https://www.youtube.com/watch?v=M7W_ge0fVcY",
  "4": "https://www.youtube.com/watch?v=ey0GZJLnq1k",
  "5": "https://www.youtube.com/watch?v=ZyoxZtAvbyg",
  "6": "https://www.youtube.com/watch?v=8iiROvGbz0o",
  "7": "https://www.youtube.com/watch?v=9tK7PXp5P0I",
  "8": "https://www.youtube.com/watch?v=UMHgXKTMBmA",
  "9": "https://www.youtube.com/watch?v=QpkIfoLSAiY",
  "10": "https://www.youtube.com/watch?v=6Hqwv7PLHis",
  "11": "https://www.youtube.com/watch?v=0XIND7vm9oI",
  "12": "https://www.youtube.com/watch?v=mY9vPIGb3Wo",
  "13": "https://www.youtube.com/watch?v=IrQyWxaj-0M",
  "14": "https://www.youtube.com/watch?v=zRgNk1FqnVQ",
  "15": "https://www.youtube.com/watch?v=1xiovCGKzO4",
  "16": "https://www.youtube.com/watch?v=puL0YdXb5s0",
  "17": "https://www.youtube.com/watch?v=jW9XBRvVPl0",
  "18": "https://www.youtube.com/watch?v=qinyxYo7ji0",
  "19": "https://www.youtube.com/watch?v=5yinfEGgzkA",
  "20": "https://www.youtube.com/watch?v=SC9_G9YW0IY",
  "21": "https://www.youtube.com/watch?v=ri7IRLl_m4s",
  "22": "https://www.youtube.com/watch?v=MRxEZlNIy9A",
  "23": "https://www.youtube.com/watch?v=y_TodDrZnuY",
  "24": "https://www.youtube.com/watch?v=VBDh24dLM4Q",
  "25": "https://www.youtube.com/watch?v=yP3oivpb__0",
  "26": "https://www.youtube.com/watch?v=2oqHKAKaPSI",
  "27": "https://www.youtube.com/watch?v=9hyrgLzZveY",
  "28": "https://www.youtube.com/watch?v=MGrB867FyCA",
  "29": "https://www.youtube.com/watch?v=7rhoG6FbNCY",
  "30": "https://www.youtube.com/watch?v=WYmqGiAMR6A",
  "31": "https://www.youtube.com/watch?v=3X7v9ayEa8c",
  "32": "https://www.youtube.com/watch?v=G_ofRbNDx-E",
  "33": "https://www.youtube.com/watch?v=bzMTgmpUieA",
  "34": "https://www.youtube.com/watch?v=bzl4qQv35x0",
  "35": "https://www.youtube.com/watch?v=FKW1O8y64Tg",
  "36": "https://www.youtube.com/watch?v=YuWLq4Y0TbQ",
  "37": "https://www.youtube.com/watch?v=B2aPdEcMgiU",
  "38": "https://www.youtube.com/watch?v=KeFlzD01zZ4",
  "39": "https://www.youtube.com/watch?v=xnd8Itx_PV8",
  "40": "https://www.youtube.com/watch?v=thmLs29JWtY",
  "41": "https://www.youtube.com/watch?v=GB18dKJNzLY",
  "42": "https://www.youtube.com/watch?v=r7iR_LJaY8g",
  "43": "https://www.youtube.com/watch?v=PeuHkqMWKBw",
  "44": "https://www.youtube.com/watch?v=LuP-4cMLi9I",
  "45": "https://www.youtube.com/watch?v=jxh6ylXv9Gw",
  "46": "https://www.youtube.com/watch?v=nJCj0oyZd1c",
  "47": "https://www.youtube.com/watch?v=Xs-EATTNuJI",
  "48": "https://www.youtube.com/watch?v=X5HTXJMiCOs",
  "49": "https://www.youtube.com/watch?v=556uUpeThK0",
  "50": "https://www.youtube.com/watch?v=STHiTOSLiD0",
  "51": "https://www.youtube.com/watch?v=z8fa92OPyKc",
  "52": "https://www.youtube.com/watch?v=CSZ8KAq2iVc",
  "53": "https://www.youtube.com/watch?v=-E7kC_9iOIc",
  "54": "https://www.youtube.com/watch?v=PoqjiIeS9mw",
  "55": "https://www.youtube.com/watch?v=qPMzHTIKaUo",
  "56": "https://www.youtube.com/watch?v=01vodXieiMw",
  "57": "https://www.youtube.com/watch?v=NyrdFXH66v0",
  "58": "https://www.youtube.com/watch?v=LUbZ2ldHURE",
  "59": "https://www.youtube.com/watch?v=hicdNzKoRmQ",
  "60": "https://www.youtube.com/watch?v=Q_lqzgVO4QQ",
  "61": "https://www.youtube.com/watch?v=X_XW4Bn3Hj8",
  "62": "https://www.youtube.com/watch?v=XxPLc2LHFeI",
  "63": "https://www.youtube.com/watch?v=mbIADubXLNY",
  "64": "https://www.youtube.com/watch?v=a7yQfq8OBv4",
  "65": "https://www.youtube.com/watch?v=nxjXQM0q9xk",
  "66": "https://www.youtube.com/watch?v=yNWZiG5198s",
  "67": "https://www.youtube.com/watch?v=oZCdQrbPBxs",
  "68": "https://www.youtube.com/watch?v=ozdnhlTrrp4",
  "69": "https://www.youtube.com/watch?v=JSQusZbPeec",
  "70": "https://www.youtube.com/watch?v=TC5PGBnZsFE",
  "71": "https://www.youtube.com/watch?v=E2GDXJsDiHQ",
  "72": "https://www.youtube.com/watch?v=b-OXGgmECWs",
  "73": "https://www.youtube.com/watch?v=YNXv-XFmwRI",
  "74": "https://www.youtube.com/watch?v=oLwyc1tj9RM",
  "75": "https://www.youtube.com/watch?v=t345ctH2l0k"
};

function createTable(beers) {
  const table = document.createElement("table");
  table.className = "beer-table";

  const headers = [
    "Brewery", "Beer Name", "ABV", "Parent Style", "Style",
    "BBBRS Score", "Untappd Score", "Can Art Score",
    "Episode No.", "Supplier", "Brewery City", "Brewery State", "Year Reviewed"
  ];

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.width = columnWidths[header] || "fit-content";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  const getTopRanks = (beers, key) => {
    const sorted = [...beers]
      .filter(b => !isNaN(parseFloat(b[key])))
      .sort((a, b) => parseFloat(b[key]) - parseFloat(a[key]));
    return sorted.slice(0, 5).map(b => b[key]);
  };

  const topBBBRS = getTopRanks(beers, "BBBRS Score");
  const topUntappd = getTopRanks(beers, "Untappd Score");
  const topCanArt = getTopRanks(beers, "Can Art Score");

  const getRankEmoji = (value, top) => {
    const index = top.indexOf(value);
    return ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][index] || "";
  };

  beers.forEach(beer => {
    const row = document.createElement("tr");

    if (episodeLinks[beer["Episode No."]]) {
      row.setAttribute("data-episode-link", episodeLinks[beer["Episode No."]]);
    }

    headers.forEach(header => {
      const td = document.createElement("td");
      const value = beer[header] || "";

      let text = value;
      let bold = false;

      if (header === "BBBRS Score" && topBBBRS.includes(value)) {
        text = `${getRankEmoji(value, topBBBRS)} ${value}`;
        bold = true;
        td.style.color = "#DAA520";
      } else if (header === "Untappd Score" && topUntappd.includes(value)) {
        text = `${getRankEmoji(value, topUntappd)} ${value}`;
        bold = true;
        td.style.color = "#DAA520";
      } else if (header === "Can Art Score" && topCanArt.includes(value)) {
        text = `${getRankEmoji(value, topCanArt)} ${value}`;
        bold = true;
        td.style.color = "#DAA520";
      }

      td.textContent = text;
      if (bold) td.style.fontWeight = "bold";
      td.style.width = columnWidths[header] || "fit-content";
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  document.getElementById("beer-table-container").appendChild(table);
}

// Make rows clickable on load
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/beers.json") // Update path if needed
    .then(response => response.json())
    .then(beers => {
      createTable(beers);

      document.querySelectorAll(".beer-table tbody tr").forEach(row => {
        row.addEventListener("click", () => {
          const episodeLink = row.getAttribute("data-episode-link");
          if (episodeLink) {
            window.open(episodeLink, "_blank");
          }
        });
      });
    });

  const searchBox = document.getElementById("beer-search");
  if (searchBox) {
    searchBox.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      document.querySelectorAll(".beer-table tbody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter)
          ? ""
          : "none";
      });
    });
  }
});
