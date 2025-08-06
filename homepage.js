const EPISODES_JSON_URL = "episodes.json"; 
  // <-- Replace with your actual raw URL to episodes.json on GitHub or your server

  const EPISODES_PER_PAGE = 10;

  let episodes = [];
  let filteredEpisodes = [];
  let currentPage = 1;
  let sortNewestFirst = true;

  const episodeGrid = document.getElementById("episode-grid");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("search");
  const toggleOrderBtn = document.getElementById("toggleOrder");

  // Fetch episodes.json and initialize
  async function loadEpisodes() {
    try {
      const res = await fetch(EPISODES_JSON_URL);
      if (!res.ok) throw new Error("Failed to fetch episodes.json");
      episodes = await res.json();
      filteredEpisodes = episodes.slice();
      render();
    } catch (err) {
      episodeGrid.innerHTML = `<p style="color:red;">Error loading episodes: ${err.message}</p>`;
    }
  }

  // Render episodes based on current filter, sort, page
  function render() {
    // Sort episodes
    filteredEpisodes.sort((a, b) => sortNewestFirst ? b.number - a.number : a.number - b.number);

    // Pagination
    const startIdx = (currentPage - 1) * EPISODES_PER_PAGE;
    const endIdx = startIdx + EPISODES_PER_PAGE;
    const pageEpisodes = filteredEpisodes.slice(startIdx, endIdx);

    // Render episode cards
    episodeGrid.innerHTML = pageEpisodes.map(ep => `
      <div class="video-card">
        <img src="https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg" alt="Episode ${ep.number} thumbnail" />
        <div class="links">
          <a href="https://www.youtube.com/watch?v=${ep.youtubeId}" target="_blank" rel="noopener">YouTube</a>
          <a href="${ep.spotifyUrl}" target="_blank" rel="noopener">Spotify</a>
          <a href="${ep.appleUrl}" target="_blank" rel="noopener">Apple Podcasts</a>
        </div>
        <div class="episode-info">
          <div class="episode-number">Episode ${ep.number}</div>
          <h2 class="episode-title">${ep.title}</h2>
          <p class="description truncated">${ep.description}</p>
        </div>
      </div>
    `).join("");

    // Render pagination buttons
    const totalPages = Math.ceil(filteredEpisodes.length / EPISODES_PER_PAGE);
    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let buttonsHTML = "";

    if (currentPage > 1) {
      buttonsHTML += `<button id="prevPage">&laquo; Prev</button>`;
    }

    buttonsHTML += `<span> Page ${currentPage} of ${totalPages} </span>`;

    if (currentPage < totalPages) {
      buttonsHTML += `<button id="nextPage">Next &raquo;</button>`;
    }

    pagination.innerHTML = buttonsHTML;

    // Add event listeners to pagination buttons
    const prevBtn = document.getElementById("prevPage");
    if (prevBtn) prevBtn.onclick = () => { currentPage--; render(); };

    const nextBtn = document.getElementById("nextPage");
    if (nextBtn) nextBtn.onclick = () => { currentPage++; render(); };
  }

  // Filter episodes by search term
  function filterEpisodes() {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
      filteredEpisodes = episodes.slice();
    } else {
      filteredEpisodes = episodes.filter(ep =>
        ep.title.toLowerCase().includes(term) ||
        ep.description.toLowerCase().includes(term)
      );
    }
    currentPage = 1;
    render();
  }

  // Toggle sort order and update button text
  function toggleSortOrder() {
    sortNewestFirst = !sortNewestFirst;
    toggleOrderBtn.textContent = sortNewestFirst ? "Show Oldest First" : "Show Newest First";
    render();
  }

  // Event listeners
  searchInput.addEventListener("input", filterEpisodes);
  toggleOrderBtn.addEventListener("click", toggleSortOrder);

  // Load episodes on page load
  loadEpisodes();
