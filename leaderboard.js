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

    const section = createEl('section', 'leaderboard beers');
    section.appendChild(createEl('h2', null, title));

    beersTop10.forEach((beer, i) => {
  const isTop3 = i < 3;
  const item = createEl('div', `leaderboard-item beer ${isTop3 ? 'top3' : 'top10'}`);

  // Rank
  item.appendChild(createEl('div', 'rank', `#${i + 1}`));

  // Beer Can Image
  const img = createEl('img', 'beer-can');
  img.src = beer.beerCanUrl || 'placeholder-image.png'; // fallback image if none
  img.alt = beer.name;
  item.appendChild(img);

  // Brewery Name
  const breweryDiv = createEl('div', 'brewery');
  breweryDiv.textContent = beer.brewery || 'Unknown Brewery';
  item.appendChild(breweryDiv);

  // Beer Name
  const nameDiv = createEl('div', 'name');
  nameDiv.textContent = beer.name;
  item.appendChild(nameDiv);

  // ABV
  const abvDiv = createEl('div', 'abv');
  abvDiv.textContent = `${beer.abv}%`;
  item.appendChild(abvDiv);

  // Style
  const styleDiv = createEl('div', 'style');
  styleDiv.textContent = beer.style || 'Unknown Style';
  item.appendChild(styleDiv);

  // Score
  const scoreDiv = createEl('div', 'score');
  scoreDiv.textContent = beer[scoreKey].toFixed(2);
  item.appendChild(scoreDiv);

  section.appendChild(item);
});


    container.appendChild(section);
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
