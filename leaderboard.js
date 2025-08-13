// ===== Top Beers =====
function getTopBeers(limit = 10) {
  return beers
    .slice() // copy array
    .sort((a, b) => b.BBBRSScore - a.BBBRSScore)
    .slice(0, limit);
}

// ===== Top Breweries =====
function getTopBreweries(limit = 10) {
  const breweryStats = {};

  beers.forEach(beer => {
    const name = beer.brewery;
    if (!breweryStats[name]) {
      breweryStats[name] = { total: 0, count: 0, logo: beer.logoUrl };
    }
    breweryStats[name].total += beer.BBBRSScore;
    breweryStats[name].count++;
  });

  const breweryAverages = Object.entries(breweryStats).map(([name, data]) => ({
    name,
    avg: data.total / data.count,
    logo: data.logo
  }));

  return breweryAverages
    .sort((a, b) => b.avg - a.avg)
    .slice(0, limit);
}

// ===== Render Leaderboards =====
function renderBeerLeaderboard() {
  const container = document.getElementById("beer-leaderboard");
  const topBeers = getTopBeers();

  container.innerHTML = topBeers
    .map((beer, i) => `
      <div class="leaderboard-item">
        <div class="rank">${i + 1}</div>
        <img src="${beer.logoUrl}" alt="${beer.brewery}" class="beer-can">
        <div class="item-info">
          <strong>${beer.beerName}</strong> (${beer.brewery})<br>
          Score: ${beer.BBBRSScore.toFixed(2)}
        </div>
      </div>
    `)
    .join("");
}

function renderBreweryLeaderboard() {
  const container = document.getElementById("brewery-leaderboard");
  const topBreweries = getTopBreweries();

  container.innerHTML = topBreweries
    .map((brewery, i) => `
      <div class="leaderboard-item">
        <div class="rank">${i + 1}</div>
        <img src="${brewery.logo}" alt="${brewery.name}" class="brewery-logo">
        <div class="item-info">
          <strong>${brewery.name}</strong><br>
          Avg Score: ${brewery.avg.toFixed(2)}
        </div>
      </div>
    `)
    .join("");
}

// ===== Init =====
renderBeerLeaderboard();
renderBreweryLeaderboard();
