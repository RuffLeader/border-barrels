(() => {
  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // --- Beer leaderboards ---
  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  function fitTextToTwoLines(el) {
    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * 2;
    let fontSize = parseFloat(style.fontSize);
    while (el.scrollHeight > maxHeight && fontSize > 10) {
      fontSize -= 0.5;
      el.style.fontSize = fontSize + 'px';
    }
  }

  function equalizeCardHeights(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.beer-card'));
    if (!cards.length) return;
    cards.forEach(c => c.style.height = 'auto');
    let maxHeight = 0;
    cards.forEach(c => {
      if (c.offsetHeight > maxHeight) maxHeight = c.offsetHeight;
    });
    cards.forEach(c => c.style.height = maxHeight + 'px');
  }

  function renderListBeer(beer, rank, container, scoreKey, delay) {
    const li = createEl('li', 'beer-card');
    if (rank <= 3) li.classList.add(`rank${rank}`);

    li.style.opacity = '0';
    li.style.transform = 'translateY(15px)';
    li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    if (delay) li.style.transitionDelay = delay + 'ms';

    const rankDiv = createEl('div', 'beer-rank', `#${rank}`);
    li.appendChild(rankDiv);

    const img = createEl('img', 'beer-image');
    img.src = beer.beerCanUrl || beer.canArtUrl || '';
    img.alt = `${beer.name} can art from ${beer.brewery || 'Unknown Brewery'}`;
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
    requestAnimationFrame(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
      fitTextToTwoLines(name);
    });
  }

  function renderBeerLeaderboard(scoreKey, listId) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    const top10 = topBeersByScore(scoreKey);
    listContainer.innerHTML = '';
    top10.forEach((beer, idx) => {
      renderListBeer(beer, idx + 1, listContainer, scoreKey, idx * 100);
    });
    setTimeout(() => equalizeCardHeights(listId), 50);
  }

  // --- Brewery leaderboards ---
  function topBreweriesByScore(scoreKey) {
    const breweryMap = {};
    beers.forEach(b => {
      if (typeof b[scoreKey] === 'number') {
        if (!breweryMap[b.brewery]) breweryMap[b.brewery] = { brewery: b.brewery, beers: [], scoreSum: 0 };
        breweryMap[b.brewery].beers.push(b);
        breweryMap[b.brewery].scoreSum += b[scoreKey];
      }
    });

    return Object.values(breweryMap)
      .map(brew => ({
        brewery: brew.brewery,
        avgScore: brew.scoreSum / brew.beers.length,
        beerCount: brew.beers.length
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);
  }

  function renderListBrewery(brew, rank, container, scoreKey, delay) {
    const li = createEl('li', 'beer-card'); 
    if (rank <= 3) li.classList.add(`rank${rank}`);

    li.style.opacity = '0';
    li.style.transform = 'translateY(15px)';
    li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    if (delay) li.style.transitionDelay = delay + 'ms';

    const rankDiv = createEl('div', 'beer-rank', `#${rank}`);
    li.appendChild(rankDiv);

    const breweryObj = brewery.find(b => b.name === brew.brewery) || {};
    const img = createEl('img', 'beer-image');
    img.src = breweryObj.logoUrl || '';
    img.alt = `${brew.brewery} logo`;
    li.appendChild(img);

    const info = createEl('div', 'beer-info');
    const name = createEl('div', 'beer-name', brew.brewery);
    info.appendChild(name);

    const breweryMeta = createEl('div', 'brewery-name', `${brew.beerCount} beers reviewed`);
    info.appendChild(breweryMeta);

    const meta = createEl('div', 'beer-meta');
    const score = createEl('div', '', `Avg: ${brew.avgScore.toFixed(2)}`);
    meta.appendChild(score);
    info.appendChild(meta);

    li.appendChild(info);
    container.appendChild(li);

    requestAnimationFrame(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
      fitTextToTwoLines(name);
    });
  }

  function renderBreweryLeaderboard(scoreKey, listId) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    const top10 = topBreweriesByScore(scoreKey);
    listContainer.innerHTML = '';
    top10.forEach((brew, idx) => {
      renderListBrewery(brew, idx + 1, listContainer, scoreKey, idx * 100);
    });
    setTimeout(() => equalizeCardHeights(listId), 50);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-leaderboard-bbbrs');

    renderBreweryLeaderboard('untappdScore', 'brewery-leaderboard-untappd');
    renderBreweryLeaderboard('bbbrsScore', 'brewery-leaderboard-bbbrs');
  });
})();
