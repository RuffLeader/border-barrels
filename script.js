console.log("Border Barrels site loaded!");

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
      .sort((a, b) => b - a)
      .slice(0, 5)
      .map(v => v.toFixed(2)); // maintain consistent format

    topScores[col] = values;
  });
}

function renderTable(beers) {
  calculateTopScores(beers);

  const table = document.createElement("table");
  table.classList.add("beer-table");

  // Table Head
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

  // Table Body
  const tbody = document.createElement("tbody");
  beers.forEach(beer => {
    const row = document.createElement("tr");
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
          if (topScores[header].includes(formattedVal)) {
            td.style.color = "#FFD700"; // gold
            td.innerHTML = `⭐ ${formattedVal}`;
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
