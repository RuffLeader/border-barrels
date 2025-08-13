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

  function renderListBeer(beer, rank, container, scoreKey, delay) {
    const li = createEl('li', 'beer-card');

    li.style.opacity = '0';
    li.style.transform = 'translateY(15px)';
    li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    if (delay) {
      li.style.transitionDelay = delay + 'ms';
    }

    const rankDiv = createEl('div', 'beer-rank', `#${rank}`);

    // 🎨 Give top 3 a muted gold/silver/bronze background
    if (rank === 1) {
      rankDiv.style.backgroundColor = '#d4af37'; // muted gold
      rankDiv.style.color = '#002157';
    } else if (rank === 2) {
      rankDiv.style.backgroundColor = '#c0c0c0'; // muted silver
      rankDiv.style.color = '#002157';
    } else if (rank === 3) {
      rankDiv.style.backgroundColor = '#cd7f32'; // muted bronze
      rankDiv.style.color = '#002157';
    }

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
    });
  }

  function renderBeerLeaderboard(scoreKey, listId) {
    const listContainer = document.getElementById(listId);

    if (!listContainer) {
      console.error('List container not found');
      return;
    }

    const top10 = topBeersByScore(scoreKey);

    listContainer.innerHTML = '';

    top10.forEach((beer, idx) => {
      renderListBeer(beer, idx + 1, listContainer, scoreKey, idx * 100);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-leaderboard-bbbrs');
  });
})();
