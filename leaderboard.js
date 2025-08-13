(() => {
  function createEl(tag, classNames, text) {
    const el = document.createElement(tag);
    if (classNames) el.className = classNames;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  function topBreweriesByScore(scoreKey) {
    return breweries
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  function averageScoresByStyle(scoreKey) {
    const styleScores = {};
    beers.forEach(b => {
      const style = b.style;
      if (!style) return;
      if (typeof b[scoreKey] !== 'number') return;

      if (!styleScores[style]) {
        styleScores[style] = { total: 0, count: 0 };
      }
      styleScores[style].total += b[scoreKey];
      styleScores[style].count += 1;
    });

    return Object.entries(styleScores)
      .map(([style, { total, count }]) => ({
        style,
        avgScore: total / count,
        count,
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);
  }

  const container = document.getElementById('leaderboards');
  if (!container) {
    console.error('No container with id "leaderboards" found.');
    return;
  }
  container.innerHTML = '';

function renderBeerLeaderboard(scoreKey, title) {
  const beersTop10 = topBeersByScore(scoreKey);

  const container = document.getElementById('beer-leaderboard');
  container.innerHTML = ''; // Clear previous

  const heading = document.createElement('h2');
  heading.textContent = title;
  heading.style.textAlign = 'center';
  heading.style.marginBottom = '24px';
  container.appendChild(heading);

  beersTop10.forEach((beer, i) => {
    const card = document.createElement('div');
    card.className = 'beer-card';
    if (i < 3) card.classList.add('top3');

    // Rank
    const rank = document.createElement('div');
    rank.className = 'beer-rank';
    rank.textContent = `#${i + 1}`;
    card.appendChild(rank);

    // Beer Image
    const img = document.createElement('img');
    img.className = 'beer-image';
    img.src = beer.beerCanUrl || 'placeholder-image.png';
    img.alt = beer.name;
    card.appendChild(img);

    // Beer Info (Name + Brewery)
    const info = document.createElement('div');
    info.className = 'beer-info';

    const name = document.createElement('div');
    name.className = 'beer-name';
    name.textContent = beer.name;
    info.appendChild(name);

    const brewery = document.createElement('div');
    brewery.className = 'brewery-name';
    brewery.textContent = beer.brewery || 'Unknown Brewery';
    info.appendChild(brewery);

    card.appendChild(info);

    // Meta (ABV, Style)
    const meta = document.createElement('div');
    meta.className = 'beer-meta';

    const abv = document.createElement('div');
    abv.textContent = `ABV: ${beer.abv || '?'}%`;
    meta.appendChild(abv);

    const style = document.createElement('div');
    style.textContent = beer.style || 'Unknown Style';
    meta.appendChild(style);

    card.appendChild(meta);

    // Score
    const score = document.createElement('div');
    score.className = 'beer-score';
    score.textContent = beer[scoreKey].toFixed(2);
    card.appendChild(score);

    container.appendChild(card);
  });
}

  function renderBreweryLeaderboard(scoreKey, title) {
    const breweriesTop10 = topBreweriesByScore(scoreKey);

    const section = createEl('section', 'leaderboard breweries');
    section.appendChild(createEl('h2', null, title));

    breweriesTop10.forEach((brewery, i) => {
      const isTop3 = i < 3;
      const item = createEl('div', `leaderboard-item brewery ${isTop3 ? 'top3' : 'top10'}`);

      item.appendChild(createEl('div', 'rank', `#${i + 1}`));

      const nameDiv = createEl('div', 'name');
      if (brewery.logoUrl) {
        const img = createEl('img', 'brewery-logo');
        img.src = brewery.logoUrl;
        img.alt = brewery.name;
        nameDiv.appendChild(img);
      }
      nameDiv.appendChild(document.createTextNode(brewery.name));
      item.appendChild(nameDiv);

      item.appendChild(createEl('div', 'score', brewery[scoreKey].toFixed(2)));

      section.appendChild(item);
    });

    container.appendChild(section);
  }

  function renderStyleLeaderboard(scoreKey, title) {
    const stylesTop10 = averageScoresByStyle(scoreKey);

    const section = createEl('section', 'leaderboard styles');
    section.appendChild(createEl('h2', null, title));

    const list = createEl('ol');
    stylesTop10.forEach(({ style, avgScore }) => {
      const li = createEl('li', 'style-item');
      li.textContent = `${style}: ${avgScore.toFixed(2)}`;
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  }

  // Render all leaderboards
  renderBeerLeaderboard('untappdScore', 'Top 10 Beers by Untappd Score');
  renderBeerLeaderboard('bbbrsScore', 'Top 10 Beers by BBBRS Score');
  renderBreweryLeaderboard('untappdScoreAvg', 'Top 10 Breweries by Untappd Score');
  renderBreweryLeaderboard('bbbrsScoreAvg', 'Top 10 Breweries by BBBRS Score');
  renderStyleLeaderboard('untappdScore', 'Top 10 Styles by Untappd Score');
  renderStyleLeaderboard('bbbrsScore', 'Top 10 Styles by BBBRS Score');
})();
