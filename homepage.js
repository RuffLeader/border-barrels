const EPISODES_JSON_URL = "episodes.json";

async function loadLatestEpisode() {
  try {
    const res = await fetch(EPISODES_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch episodes.json");

    const episodes = await res.json();

    // Get the latest episode (highest number)
    const latest = episodes.sort((a, b) => b.number - a.number)[0];

    // Render only the full-width thumbnail image
    const container = document.getElementById("latest-episode-container");

    container.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${latest.youtubeId}" target="_blank" rel="noopener">
        <img src="https://img.youtube.com/vi/${latest.youtubeId}/maxresdefault.jpg" 
             alt="Episode ${latest.number} thumbnail" 
             style="width: 100%; height: auto; display: block;" />
      </a>
    `;
  } catch (err) {
    document.getElementById("latest-episode-container").innerHTML =
      `<p style="color:red;">Error loading latest episode: ${err.message}</p>`;
  }
}

loadLatestEpisode();
