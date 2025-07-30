console.log("Border Barrels site loaded!");

const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y"; // Your SheetDB API

let allBeers = [];

function renderBeerCard(beer) {
  return `
    <div class="beer-card collapsible">
      <button class="beer-toggle">
        <strong>${beer.Brewery} - ${beer["Beer Name"]} (${beer.ABV}%)</strong>
      </button>
      <div class="beer-content">
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
    </div>
  `;
}

function renderBeers(beers) {
  const container = document.getElementById("beer-container");
  if (!container) return;
  container.innerHTML = beers.map(renderBeerCard).join("");
  setupCollapsibles();
}

function setupCollapsibles() {
  const toggles = document.querySelectorAll(".beer-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      const content = toggle.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}

function filterBeers(query) {
  const q = query.toLowerCase();
  const filtered = allBeers.filter(beer =>
    `${beer.Brewery} ${beer["Beer Name"]} ${beer["Style"]} ${beer.Supplier}`.toLowerCase().includes(q)
  );
  renderBeers(filtered);
}

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    allBeers = data;
    renderBeers(allBeers);

    const searchInput = document.getElementById("beer-search");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        filterBeers(searchInput.value);
      });
    }
  })
  .catch(error => {
    document.getElementById("beer-container").innerHTML = "Failed to load beers.";
    console.error("Error fetching beers:", error);
  });
