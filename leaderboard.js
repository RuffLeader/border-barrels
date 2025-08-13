(() => {
  // Utility to create an element with classes and optional text
  function createEl(tag, classNames, text) {
    const el = document.createElement(tag);
    if (classNames) el.className = classNames;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // --- BEERS Leaderboards ---

  // Sort beers by score desc and take top 10
  function topBeersByScore(scoreKey) {
    return beers
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  // --- BREWERIES Leaderboards ---

  // Sort breweries by average score desc and take top 10
  function topBreweriesByScore(scoreKey) {
    return breweries
      .filter(b => typeof b[scoreKey] === 'number')
      .sort((a, b) => b[scoreKey] - a[scoreKey])
      .slice(0, 10);
  }

  // --- STYLES Leaderboards ---

  // For styles, calculate average scores from beers
  function averageScoresByStyle(scoreKey) {
    // Aggregate scores by style
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

    // Calculate average and convert to array
    const averages = Object.entries(styleScores).map(([style, { total, count }]) => ({
      style,
      avgScore: total / count,
      count,
    }));

    // Sort desc and take top 10
    return averages
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);
  }

  // --- RENDERING ---

  // Container to attach all leaderboards to
  const container = document.getElementById('leaderboards');
  if (!container) {
    console.error('No container with id "leaderboards" found in DOM');
    return;
  }

  // Render Top 10 Beers Leaderboard (scoreKey = 'untappdScore' or 'bbbrsScore')
  function renderBeerLeaderboard(scoreKey, title) {
    const beersTop10 = topBeersByScore(scoreKey);

    const section = createEl('section', 'leaderboard beers');
    const h2 = createEl('h2', null, title);
    section.appendChild(h2);

    beersTop10.forEach((beer, i) => {
      const isTop3 = i < 3;
      const item = createEl('div', `leaderboard-item beer ${isTop3 ? 'top3' : 'top10'}`);

      // Rank
      item.appendChild(createEl('div', 'rank', `#${i + 1}`));

      // Name (beer name and brewery)
      const nameDiv = createEl('div', 'name');
      nameDiv.textContent = `${beer.name} (${beer.brewery || 'Unknown Brewery'})`;
      item.appendChild(nameDiv);

      // Score
      item.appendChild(createEl('div', 'score', beer[scoreKey].toFixed(2)));

      section.appendChild(item);
    });

    container.appendChild(section);
  }

  // Render Top 10 Breweries Leaderboard
  function renderBreweryLeaderboard(scoreKey, title) {
    const breweriesTop10 = topBreweriesByScore(scoreKey);

    const section = createEl('section', 'leaderboard breweries');
    const h2 = createEl('h2', null, title);
    section.appendChild(h2);

    breweriesTop10.forEach((brewery, i) => {
      const isTop3 = i < 3;
      const item = createEl('div', `leaderboard-item brewery ${isTop3 ? 'top3' : 'top10'}`);

      // Rank
      item.appendChild(createEl('div', 'rank', `#${i + 1}`));

      // Name + logo if available
      const nameDiv = createEl('div', 'name');
      if (brewery.logoUrl) {
        const img = createEl('img', 'brewery-logo');
        img.src = brewery.logoUrl;
        img.alt = brewery.name;
        img.style.maxHeight = '40px';
        img.style.marginRight = '8px';
        nameDiv.appendChild(img);
      }
      nameDiv.appendChild(document.createTextNode(brewery.name));
      item.appendChild(nameDiv);

      // Score
      item.appendChild(createEl('div', 'score', brewery[scoreKey].toFixed(2)));

      section.appendChild(item);
    });

    container.appendChild(section);
  }

  // Render Top 10 Styles Leaderboard (simpler list)
  function renderStyleLeaderboard(scoreKey, title) {
    const stylesTop10 = averageScoresByStyle(scoreKey);

    const section = createEl('section', 'leaderboard styles');
    const h2 = createEl('h2', null, title);
    section.appendChild(h2);

    const list = createEl('ol');
    stylesTop10.forEach(({ style, avgScore }) => {
      const li = createEl('li', 'style-item');
      li.textContent = `${style}: ${avgScore.toFixed(2)}`;
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  }

  // Clear existing content (optional)
  container.innerHTML = '';

  // Render all 6 leaderboards

  // Beers
  renderBeerLeaderboard('untappdScore', 'Top 10 Beers by Untappd Score');
  renderBeerLeaderboard('bbbrsScore', 'Top 10 Beers by BBBRS Score');

  // Breweries
  renderBreweryLeaderboard('untappdScoreAvg', 'Top 10 Breweries by Untappd Score');
  renderBreweryLeaderboard('bbbrsScoreAvg', 'Top 10 Breweries by BBBRS Score');

  // Styles
  renderStyleLeaderboard('untappdScore', 'Top 10 Styles by Untappd Score');
  renderStyleLeaderboard('bbbrsScore', 'Top 10 Styles by BBBRS Score');
})();
