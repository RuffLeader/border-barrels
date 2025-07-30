// Placeholder for future JS functionality
console.log("Border Barrels site loaded!");
const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y"; // Replace with your real SheetDB API URL

function renderBeerCard(beer) {
  return `
    <div class="beer-card">
      <h3>${beer.Brewery} – ${beer["Beer Name"]} (${beer.ABV}%)</h3>
      <p><strong>Location:</strong> ${beer["Brewery City"]}, ${beer["Brewery State"]}</p>
      <p><strong>Style:</strong> ${beer["Style"]} (${beer["Parent Style"]})</p>
      <p><strong>Reviewed in Episode:</strong> ${beer["Episode No."]} (${beer["Year Reviewed"]})</p>
      <p><strong>Supplier:</strong> ${beer.Supplier}</p>

      <h4>🧪 BBBRS Score: ${beer["BBBRS Score"]}</h4>
      <ul>
        <li>Simon: ${beer["BBBRS Simon"]}</li>
        <li>Zach: ${beer["BBBRS Zach"]}</li>
        <li>Hudson: ${beer["BBBRS Hudson"]}</li>
      </ul>

      <h4>📊 Untappd Score: ${beer["Untappd Score"]}</h4>
      <ul>
        <li>Simon: ${beer["Untappd Simon"]}</li>
        <li>Zach: ${beer["Untappd Zach"]}</li>
        <li>Hudson: ${beer["Untappd Hudson"]}</li>
      </ul>

      <h4>🎨 Can Art Score: ${beer["Can Art Score"]}</h4>
      <ul>
        <li>Simon: ${beer["Can Art Simon"]}</li>
        <li>Zach: ${beer["Can Art Zach"]}</li>
        <li>Hudson: ${beer["Can Art Hudson"]}</li>
      </ul>
    </div>
  `;
}

function filterBeers(query, beers) {
  return beers.filter((beer) => {
    const searchString = `\${beer["Beer Name"]} \${beer.Brewery} \${beer.Style} \${beer.Supplier}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });
}

function renderBeers(beers) {
  const container = document.getElementById("beer-container");
  container.innerHTML = beers.map(renderBeerCard).join("");

  // Add collapsible functionality
  document.querySelectorAll(".beer-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("collapsed");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      let beers = data;
      renderBeers(beers);

      const searchInput = document.getElementById("beer-search");
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const filtered = filterBeers(searchInput.value, beers);
          renderBeers(filtered);
        });
      }
    })
    .catch((error) => {
      console.error("Error loading beers:", error);
      document.getElementById("beer-container").innerHTML =
        "<p>Failed to load beers. Please try again later.</p>";
    });
});
