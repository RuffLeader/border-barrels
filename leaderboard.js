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

  // Dynamically reduce font size to fit max 2 lines
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

  // Equalize card heights in a container
  function equalizeCardHeights(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.beer-card'));
    if (!cards.length) return;

    // Reset heights
    cards.forEach(c => c.style.height = 'auto');

    // Find the tallest card
    let maxHeight = 0;
    cards.forEach(c => {
      const h = c.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });

    // Apply max height to all cards
    cards.forEach(c => c.style.height = maxHeight + 'px');
  }

  function renderListBeer(beer, rank, container, scoreKey, delay) {
    const li = createEl('li', 'beer-card');

    // Add rank-specific class for top 3
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

    // Fade-in animation
    requestAnimationFrame(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
      fitTextToTwoLines(name); // Adjust font to fit 2 lines
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

    // Equalize card heights after a short delay
    setTimeout(() => equalizeCardHeights(listId), 50);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBeerLeaderboard('untappdScore', 'beer-leaderboard-untappd');
    renderBeerLeaderboard('bbbrsScore', 'beer-leaderboard-bbbrs');
  });
})();
