(() => {
  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // --- Fit text to max 2 lines by shrinking font ---
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
    cards.forEach(c => (c.style.height = 'auto'));
    let maxHeight = 0;
    cards.forEach(c => {
      if (c.offsetHeight > maxHeight) maxHeight = c.offsetHeight;
    });
    cards.forEach(c => (c.style.height = maxHeight + 'px'));
  }

  // --- Beer leaderboards ---
  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
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
      fitTextToTwoLines(name); // ← ensures beer name fits 2 lines
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
    return brewery
      .map(brew => {
        const beersByBrew = beers.filter(be => be.brewery === brew.name && typeof be[scoreKey] === 'number');
        const avgScore = beersByBrew.length
          ? beersByBrew.reduce((sum, b) => sum + b[scoreKey], 0) / beersByBrew.length
          : 0;
        return {
          ...brew,
          avgScore,
          beerCount: beersByBrew.length
        };
      })
      .filter(b => b.beerCount > 0)
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

  const img = createEl('img', 'beer-image');
  img.src = brew.logoUrl || '';
  img.alt = `${brew.name} logo`;
  li.appendChild(img);

  const info = createEl('div', 'beer-info');
  const name = createEl('div', 'beer-name', brew.name);
  info.appendChild(name);

  const breweryMeta = createEl('div', 'brewery-name', `${brew.beerCount} Beers Reviewed`);
  info.appendChild(breweryMeta);

  const meta = createEl('div', 'beer-meta');
  // Episodes at bottom
  const episodes = createEl('div', '', `Episode Number: ${brew.epnum?.join(', ') || 'N/A'}`);
  meta.appendChild(episodes);
  info.appendChild(meta);

  li.appendChild(info);

  // Score on the right, like beer cards
  const score = createEl('div', 'beer-score', brew.avgScore.toFixed(2));
  li.appendChild(score);

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

  // --- Style leaderboards ---
function topStylesByScore(scoreKey) {
  const stylesMap = {};

  beers.forEach(beer => {
    if (typeof beer[scoreKey] === 'number' && beer.style) {
      if (!stylesMap[beer.style]) {
        stylesMap[beer.style] = { name: beer.style, totalScore: 0, count: 0 };
      }
      stylesMap[beer.style].totalScore += beer[scoreKey];
      stylesMap[beer.style].count++;
    }
  });

  return Object.values(stylesMap)
    .map(s => ({
      ...s,
      avgScore: s.totalScore / s.count
    }))
    .filter(s => s.count > 1) // only keep styles with at least 2 beers
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 10);
}

function renderListStyle(style, rank, container, scoreKey, delay) {
  const li = createEl('li', 'beer-card');
  if (rank <= 3) li.classList.add(`rank${rank}`);

  li.style.opacity = '0';
  li.style.transform = 'translateY(15px)';
  li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  if (delay) li.style.transitionDelay = delay + 'ms';

  const rankDiv = createEl('div', 'beer-rank', `#${rank}`);
  li.appendChild(rankDiv);

  // Placeholder image for style
  const img = createEl('img', 'beer-image');
  img.src = '/images/style-placeholder.png'; // change path if needed
  img.alt = `${style.name} icon`;
  li.appendChild(img);

  const info = createEl('div', 'beer-info');
  const name = createEl('div', 'beer-name', style.name);
  info.appendChild(name);

  const count = createEl('div', 'brewery-name', `${style.count} Beers Reviewed`);
  info.appendChild(count);

  li.appendChild(info);

  const score = createEl('div', 'beer-score', style.avgScore.toFixed(2));
  li.appendChild(score);

  container.appendChild(li);

  requestAnimationFrame(() => {
    li.style.opacity = '1';
    li.style.transform = 'translateY(0)';
    fitTextToTwoLines(name);
  });
}

function renderStyleLeaderboard(scoreKey, listId) {
  const listContainer = document.getElementById(listId);
  if (!listContainer) return;
  const top10 = topStylesByScore(scoreKey);
  listContainer.innerHTML = '';
  top10.forEach((style, idx) => {
    renderListStyle(style, idx + 1, listContainer, scoreKey, idx * 100);
  });
  setTimeout(() => equalizeCardHeights(listId), 50);
}

  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-leaderboard-bbbrs');

    renderBreweryLeaderboard('untappdScore', 'brewery-leaderboard-untappd');
    renderBreweryLeaderboard('bbbrsScore', 'brewery-leaderboard-bbbrs');

    renderStyleLeaderboard('untappdScore', 'style-leaderboard-untappd');
    renderStyleLeaderboard('bbbrsScore', 'style-leaderboard-bbbrs');
  });
})();
