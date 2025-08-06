const EPISODES_JSON_URL = "episodes.json";

async function loadLatestEpisode() {
  try {
    const res = await fetch(EPISODES_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch episodes.json");

    const episodes = await res.json();

    // Get the latest episode
    const latest = episodes.sort((a, b) => b.number - a.number)[0];

    const container = document.getElementById("latest-episode-container");

    container.innerHTML = `
      <div class="latest-episode-card">
        <a href="https://www.youtube.com/watch?v=${latest.youtubeId}" target="_blank" rel="noopener" class="thumbnail-wrapper">
          <img class="thumbnail" src="https://img.youtube.com/vi/${latest.youtubeId}/maxresdefault.jpg" alt="Episode ${latest.number} thumbnail" />
          <div class="play-icon">&#9658;</div>
        </a>
        <div class="episode-meta">
          <h2>Episode ${latest.number}: ${latest.title}</h2>
          <p>${latest.description}</p>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById("latest-episode-container").innerHTML =
      `<p style="color:red;">Error loading latest episode: ${err.message}</p>`;
  }
}

loadLatestEpisode();
