console.log("Border Barrels site loaded!");

const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y"; // Your SheetDB API
let allBeers = [];

const headers = [
  "Brewery", "Beer Name", "ABV", "Parent Style", "Style",
  "BBBRS Score", "BBBRS Simon", "BBBRS Zach", "BBBRS Hudson",
  "Untappd Score", "Untappd Simon", "Untappd Zach", "Untappd Hudson",
  "Can Art Score", "Can Art Simon", "Can Art Zach", "Can Art Hudson",
  "Episode No.", "Supplier", "Brewery City", "Brewery State", "Year Reviewed"
];

function renderTable(beers) {
  const table = document.createElement("table");
  table.classList.add("beer-table");

  // Table Head
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
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
      td.textContent = beer[header] || "";
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Inject into page
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

// Fetch and render beers
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
