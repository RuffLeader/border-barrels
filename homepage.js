const EPISODES_JSON_URL = "episodes.json";

async function loadLatestEpisode() {
  try {
    const res = await fetch(EPISODES_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch episodes.json");

    const episodes = await res.json();

    // Sort episodes by number (descending) to find the latest
    const latest = episodes.sort((a, b) => b.number - a.number)[0];

    const container = document.getElementById("latest-episode-container");

    container.innerHTML = `
      <div class="video-card">
        <img src="https://img.youtube.com/vi/${latest.youtubeId}/hqdefault.jpg" alt="Episode ${latest.number} thumbnail" />
        <div class="links">
          <a href="https://www.youtube.com/watch?v=${latest.youtubeId}" target="_blank" rel="noopener">YouTube</a>
          <a href="${latest.spotifyUrl}" target="_blank" rel="noopener">Spotify</a>
          <a href="${latest.appleUrl}" target="_blank" rel="noopener">Apple Podcasts</a>
        </div>
        <div class="episode-info">
          <div class="episode-number">Episode ${latest.number}</div>
          <h2 class="episode-title">${latest.title}</h2>
          <p class="description">${latest.description}</p>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById("latest-episode-container").innerHTML =
      `<p style="color:red;">Error loading latest episode: ${err.message}</p>`;
  }
}

loadLatestEpisode();
