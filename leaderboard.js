(() => {
  // Utility to create an element with optional class and text
  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // Sort beers by score desc and take top 10
  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  // Render beers to a given container by score type
  function renderBeerLeaderboard(scoreKey, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    const top10 = topBeersByScore(scoreKey);
    container.innerHTML = ''; // Clear existing

    top10.forEach((beer, i) => {
  const li = createEl('li', `leaderboard-item beer ${i < 3 ? 'top3' : 'top10'}`);

  // Rank
  const rank = createEl('div', 'rank', `#${i + 1}`);
  li.appendChild(rank);

  // Beer Can Image
  const img = createEl('img', 'beer-can');
  img.src = beer.beerCanUrl || beer.canArtUrl || '';
  img.alt = beer.name + ' can art';
  li.appendChild(img);

  // Info container
  const info = createEl('div', 'item-info');

  // Beer name
  const name = createEl('div', 'name', beer.name);
  info.appendChild(name);

  // Brewery name
  const brewery = createEl('div', 'brewery-name', beer.brewery || 'Unknown Brewery');
  info.appendChild(brewery);

  // Meta (ABV & Style)
  const meta = createEl('div', 'beer-meta');
  const abv = createEl('div', '', `ABV: ${beer.abv ? beer.abv.toFixed(1) + '%' : 'N/A'}`);
  const style = createEl('div', '', beer.style || 'Unknown style');
  meta.appendChild(abv);
  meta.appendChild(style);
  info.appendChild(meta);

  li.appendChild(info);

  // Score
  const score = createEl('div', 'score', beer[scoreKey].toFixed(2));
  li.appendChild(score);

  container.appendChild(li);
});
  }

  // Run rendering on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-leaderboard-bbbrs');
  });
})();
