console.log("Border Barrels site loaded!");

const episodeLinks = {
  "1": "riVK2nrD4Kk",
  "2": "aOvtCZfrJJI",
  "3": "M7W_ge0fVcY",
  "4": "ey0GZJLnq1k",
  "5": "ZyoxZtAvbyg",
  "6": "8iiROvGbz0o",
  "7": "9tK7PXp5P0I",
  "8": "UMHgXKTMBmA",
  "9": "QpkIfoLSAiY",
  "10": "6Hqwv7PLHis",
  "11": "0XIND7vm9oI",
  "12": "mY9vPIGb3Wo",
  "13": "IrQyWxaj-0M",
  "14": "zRgNk1FqnVQ",
  "15": "1xiovCGKzO4",
  "16": "puL0YdXb5s0",
  "17": "jW9XBRvVPl0",
  "18": "qinyxYo7ji0",
  "19": "5yinfEGgzkA",
  "20": "SC9_G9YW0IY",
  "21": "ri7IRLl_m4s",
  "22": "MRxEZlNIy9A",
  "23": "y_TodDrZnuY",
  "24": "VBDh24dLM4Q",
  "25": "yP3oivpb__0",
  "26": "2oqHKAKaPSI",
  "27": "9hyrgLzZveY",
  "28": "MGrB867FyCA",
  "29": "7rhoG6FbNCY",
  "30": "WYmqGiAMR6A",
  "31": "3X7v9ayEa8c",
  "32": "G_ofRbNDx-E",
  "33": "bzMTgmpUieA",
  "34": "bzl4qQv35x0",
  "35": "FKW1O8y64Tg",
  "36": "YuWLq4Y0TbQ",
  "37": "B2aPdEcMgiU",
  "38": "KeFlzD01zZ4",
  "39": "xnd8Itx_PV8",
  "40": "thmLs29JWtY",
  "41": "GB18dKJNzLY",
  "42": "r7iR_LJaY8g",
  "43": "PeuHkqMWKBw",
  "44": "LuP-4cMLi9I",
  "45": "jxh6ylXv9Gw",
  "46": "nJCj0oyZd1c",
  "47": "Xs-EATTNuJI",
  "48": "X5HTXJMiCOs",
  "49": "556uUpeThK0",
  "50": "STHiTOSLiD0",
  "51": "z8fa92OPyKc",
  "52": "CSZ8KAq2iVc",
  "53": "-E7kC_9iOIc",
  "54": "PoqjiIeS9mw",
  "55": "qPMzHTIKaUo",
  "56": "01vodXieiMw",
  "57": "NyrdFXH66v0",
  "58": "LUbZ2ldHURE",
  "59": "hicdNzKoRmQ",
  "60": "Q_lqzgVO4QQ",
  "61": "X_XW4Bn3Hj8",
  "62": "XxPLc2LHFeI",
  "63": "mbIADubXLNY",
  "64": "a7yQfq8OBv4",
  "65": "nxjXQM0q9xk",
  "66": "yNWZiG5198s",
  "67": "oZCdQrbPBxs",
  "68": "ozdnhlTrrp4",
  "69": "JSQusZbPeec",
  "70": "TC5PGBnZsFE",
  "71": "E2GDXJsDiHQ",
  "72": "b-OXGgmECWs",
  "73": "YNXv-XFmwRI",
  "74": "oLwyc1tj9RM",
  "75": "t345ctH2l0k"
};

const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y";
let allBeers = [];

const headers = [
  "Brewery", "Beer Name", "ABV", "Parent Style", "Style",
  "BBBRS Score", "Untappd Score", "Can Art Score",
  "Episode No.", "Supplier", "Brewery City", "Brewery State", "Year Reviewed"
];

const columnWidths = {
  "Brewery": "200px",
  "Beer Name": "200px",
  "ABV": "60px",
  "Parent Style": "140px",
  "Style": "140px",
  "BBBRS Score": "90px",
  "Untappd Score": "90px",
  "Can Art Score": "160px",
  "Episode No.": "90px",
  "Supplier": "140px",
  "Brewery City": "140px",
  "Brewery State": "100px",
  "Year Reviewed": "100px"
};

const ratingColumns = ["BBBRS Score", "Untappd Score", "Can Art Score"];
let topScores = {
  "BBBRS Score": [],
  "Untappd Score": [],
  "Can Art Score": []
};

function calculateTopScores(beers) {
  ratingColumns.forEach(col => {
    const values = beers
      .map(b => parseFloat(b[col]))
      .filter(v => !isNaN(v))
      .sort((a, b) => b - a);

    topScores[col] = values.slice(0, 5).map(v => v.toFixed(2));
  });
}

function renderTable(beers) {
  calculateTopScores(beers);

  const table = document.createElement("table");
  table.classList.add("beer-table");

  // Table head
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.width = columnWidths[header] || "100px";
    th.style.textAlign = "center";
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  beers.forEach(beer => {
    const row = document.createElement("tr");

    // Add click event if Episode No. has a matching YouTube ID
    const episodeId = episodeLinks[beer["Episode No."]];
    if (episodeId) {
      row.style.cursor = "pointer";
      row.addEventListener("click", () => {
        window.open(`https://www.youtube.com/watch?v=${episodeId}`, "_blank");
      });
    }

    headers.forEach(header => {
      const td = document.createElement("td");
      let cellValue = beer[header] || "";
      td.style.width = columnWidths[header] || "100px";
      td.style.textAlign = "center";

      if (ratingColumns.includes(header)) {
        td.style.fontWeight = "bold";
        const numericVal = parseFloat(cellValue);
        if (!isNaN(numericVal)) {
          const formattedVal = numericVal.toFixed(2);
          const topVals = topScores[header];

          const medalIndex = topVals.indexOf(formattedVal);
          if (medalIndex >= 0 && medalIndex < 5) {
            td.style.color = "#FFD700"; // highlight

            let medal = "";
            if (medalIndex === 0) medal = "🥇 ";
            else if (medalIndex === 1) medal = "🥈 ";
            else if (medalIndex === 2) medal = "🥉 ";

            td.innerHTML = `${medal}${formattedVal}`;
          } else {
            td.textContent = formattedVal;
          }
        } else {
          td.textContent = cellValue;
        }
      } else {
        td.textContent = cellValue;
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  const container = document.getElementById("beer-table-container");
  container.innerHTML = "";
  container.appendChild(table);
}

function filterBeers(query) {
  const q = query.toLowerCase();
  const filtered = allBeers.filter(beer =>
    headers.some(header => (beer[header] || "").toLowerCase().includes(q))
  );
  renderTable(filtered);
}

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    allBeers = data;
    renderTable(allBeers);

    const searchInput = document.getElementById("beer-search");
    searchInput.addEventListener("input", () => {
      filterBeers(searchInput.value);
    });
  })
  .catch(error => {
    const container = document.getElementById("beer-table-container");
    container.innerHTML = "Failed to load beers.";
    console.error("Error loading beers:", error);
  });
