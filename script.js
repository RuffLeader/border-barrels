// Placeholder for future JS functionality
console.log("Border Barrels site loaded!");
const apiURL = "https://sheetdb.io/api/v1/2a291ogsqgr9y"; // Replace with your actual SheetDB URL

function renderBeerCard(beer) {
  return `
    <div class="beer-card">
      <h3>${beer.Beer}</h3>
      <p><strong>Brewery:</strong> ${beer.Brewery}</p>
      <p><strong>Episode:</strong> ${beer.Episode}</p>
      <p><strong>Overall Score:</strong> ${beer.Overall}</p>
      <ul>
        <li>Hudson: ${beer.Rating_Hudson}</li>
        <li>Zach: ${beer.Rating_Zach}</li>
        <li>Simon: ${beer.Rating_Simon}</li>
        <li>Provided by: ${beer.Provider}</li>
      </ul>
    </div>
  `;
}

axios.get(apiURL)
  .then(response => {
    const beers = response.data;
    const container = document.getElementById("beer-container");
    container.innerHTML = beers.map(renderBeerCard).join("");
  })
  .catch(error => {
    console.error("Error loading beers:", error);
    document.getElementById("beer-container").innerHTML = "<p>Failed to load beers.</p>";
  });
