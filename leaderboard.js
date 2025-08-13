(() => {
  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  function renderPodiumBeer(beer, rank, container) {
    const card = createEl('div', `beer-card pos${rank}`);
    
    // Rank big number
    const rankDiv = createEl('div', 'beer-rank', `#${rank}`);
    card.appendChild(rankDiv);

    // Image
    const img = createEl('img', 'beer-image');
    img.src = beer.beerCanUrl || beer.canArtUrl || '';
    img.alt = beer.name + ' can art';
    card.appendChild(img);

    // Name
    const name = createEl('div', 'beer-name', beer.name);
    card.appendChild(name);

    // Brewery
    const brewery = createEl('div', 'brewery-name', beer.brewery || 'Unknown Brewery');
    card.appendChild(brewery);

    // Meta info (abv & style)
    const meta = createEl('div', 'beer-meta');
    const abv = createEl('div', '', `ABV: ${beer.abv ? beer.abv.toFixed(1) + '%' : 'N/A'}`);
    const style = createEl('div', '', beer.style || 'Unknown style');
    meta.appendChild(abv);
    meta.appendChild(style);
    card.appendChild(meta);

    // Score
    const score = createEl('div', 'beer-score', beer[scoreKey].toFixed(2));
    card.appendChild(score);

    container.appendChild(card);
  }

  function renderListBeer(beer, rank, container) {
    const li = createEl('li', 'beer-card');

    const rankDiv = createEl('div', 'beer-rank', `#${rank}`);
    li.appendChild(rankDiv);

    const img = createEl('img', 'beer-image');
    img.src = beer.beerCanUrl || beer.canArtUrl || '';
    img.alt = beer.name + ' can art';
    li.appendChild(img);

    const info = createEl('div', 'beer-info');

    const name = createEl('div', 'beer-name', beer.name);
    info.appendChild(name);

    const brewery = createEl('div', 'brewery-name', beer.brewery || 'Unknown Brewery');
    info.appendChild(brewery);

    const meta = createEl('div', 'beer-meta');
    const abv = createEl('div', '', `ABV: ${beer.abv ? beer.abv.toFixed(1) + '%' : 'N/A'}`);
    const style = createEl('div', '', beer.style || 'Unknown style');
    meta.appendChild(abv);
    meta.appendChild(style);
    info.appendChild(meta);

    li.appendChild(info);

    const score = createEl('div', 'beer-score', beer[scoreKey].toFixed(2));
    li.appendChild(score);

    container.appendChild(li);
  }

  function renderBeerLeaderboard(scoreKey, podiumId, listId) {
    const podiumContainer = document.getElementById(podiumId);
    const listContainer = document.getElementById(listId);

    if (!podiumContainer || !listContainer) {
      console.error('Podium or list container not found');
      return;
    }

    const top10 = topBeersByScore(scoreKey);

    podiumContainer.innerHTML = '';
    listContainer.innerHTML = '';

    // Podium top 3 in order: 2,1,3 for layout
    const podiumOrder = [2, 1, 3];

    podiumOrder.forEach(pos => {
      const beer = top10[pos - 1];
      if (beer) renderPodiumBeer(beer, pos, podiumContainer);
    });

    // Rest of beers 4-10
    for (let i = 3; i < top10.length; i++) {
      renderListBeer(top10[i], i + 1, listContainer);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-podium-untappd', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-podium-bbbrs', 'beer-leaderboard-bbbrs');
  });
})();
