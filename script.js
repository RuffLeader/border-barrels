// Placeholder for future JS functionality
console.log("Border Barrels site loaded!");
const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y"; // Replace with your real SheetDB API URL

function createTable(beerData) {
  const container = document.getElementById("beer-container");
  container.innerHTML = `
    <input type="text" id="beer-search" placeholder="Search beers..." style="margin-bottom: 20px; padding: 8px; width: 100%; max-width: 600px; display: block; margin-left: auto; margin-right: auto;" />
    <div id="beer-table-container" style="overflow-x:auto;">
      <table id="beer-table" style="margin: 0 auto; border-collapse: collapse; width: 95%;">
        <thead>
          <tr>
            <th>Brewery</th>
            <th>Beer Name</th>
            <th>ABV</th>
            <th>Parent Style</th>
            <th>Style</th>
            <th>BBBRS Score</th>
            <th>Simon</th>
            <th>Zach</th>
            <th>Hudson</th>
            <th>Untappd Score</th>
            <th>Simon</th>
            <th>Zach</th>
            <th>Hudson</th>
            <th>Can Art Score</th>
            <th>Simon</th>
            <th>Zach</th>
            <th>Hudson</th>
            <th>Episode No.</th>
            <th>Supplier</th>
            <th>Brewery City</th>
            <th>Brewery State</th>
            <th>Year Reviewed</th>
          </tr>
        </thead>
        <tbody>
          ${beerData.map(beer => `
            <tr>
              <td>${beer["Brewery"]}</td>
              <td>${beer["Beer Name"]}</td>
              <td>${beer["ABV"]}</td>
              <td>${beer["Parent Style"]}</td>
              <td>${beer["Style"]}</td>
              <td>${beer["BBBRS Score"]}</td>
              <td>${beer["BBBRS Simon"]}</td>
              <td>${beer["BBBRS Zach"]}</td>
              <td>${beer["BBBRS Hudson"]}</td>
              <td>${beer["Untappd Score"]}</td>
              <td>${beer["Untappd Simon"]}</td>
              <td>${beer["Untappd Zach"]}</td>
              <td>${beer["Untappd Hudson"]}</td>
              <td>${beer["Can Art Score"]}</td>
              <td>${beer["Can Art Simon"]}</td>
              <td>${beer["Can Art Zach"]}</td>
              <td>${beer["Can Art Hudson"]}</td>
              <td>${beer["Episode No."]}</td>
              <td>${beer["Supplier"]}</td>
              <td>${beer["Brewery City"]}</td>
              <td>${beer["Brewery State"]}</td>
              <td>${beer["Year Reviewed"]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const searchInput = document.getElementById("beer-search");
  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#beer-table tbody tr");

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });
}

fetch(apiURL)
  .then(response => response.json())
  .then(data => createTable(data))
  .catch(error => {
    console.error("Error loading beers:", error);
    document.getElementById("beer-container").textContent = "Failed to load beers.";
  });
