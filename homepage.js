async function loadLatestEpisode() {
  try {
    const res = await fetch("episodes.json");
    if (!res.ok) throw new Error("Failed to fetch episodes.json");

    const episodes = await res.json();
    const latest = episodes.sort((a, b) => b.number - a.number)[0];

    const container = document.getElementById("latest-episode-container");

    container.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${latest.youtubeId}" target="_blank" rel="noopener" class="latest-episode-card" aria-label="Watch latest episode on YouTube">
        <div class="video-thumbnail">
          <img src="https://img.youtube.com/vi/${latest.youtubeId}/maxresdefault.jpg" alt="Thumbnail for Episode ${latest.number}: ${latest.title}">
          <div class="play-icon"></div>
        </div>
      </a>
      <div class="episode-meta">
        <h2>Episode ${latest.number}: ${latest.title}</h2>
        <p>${latest.description}</p>
      </div>
    `;
  } catch (err) {
    const container = document.getElementById("latest-episode-container");
    container.innerHTML = `<p style="color:red;">Error loading latest episode: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadLatestEpisode);
