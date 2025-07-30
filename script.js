console.log("Border Barrels site loaded!");
const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y";

function renderBeerCard(beer) {
  return `
    <div class="beer-card">
      <h3>${beer["Beer Name"]} (${beer.ABV}%)</h3>
      <p><strong>Brewery:</strong> ${beer.Brewery} (${beer["Brewery City"]}, ${beer["Brewery State"]})</p>
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

function loadBeers() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("beer-container");
      if (!data || data.length === 0) {
        container.innerHTML = "<p>No beers found.</p>";
        return;
      }

      const cardsHTML = data.map(renderBeerCard).join("");
      container.innerHTML = cardsHTML;
    })
    .catch(error => {
      console.error("Error fetching beers:", error);
      document.getElementById("beer-container").innerHTML = "<p>Failed to load beers.</p>";
    });
}

// Run once the page is fully loaded
document.addEventListener("DOMContentLoaded", loadBeers);
