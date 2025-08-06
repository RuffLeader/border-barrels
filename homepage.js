document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    const container = document.getElementById("latest-episode-container");
    if (!container) return;

    const latest = episodes[0]; // Assuming episodes are sorted newest-first

    const episodeHTML = `
      <h3>${latest.title}</h3>
      <p>${latest.description}</p>
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;">
        <iframe src="https://www.youtube.com/embed/${latest.youtubeId}" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
      </div>
      <p>
        <a href="${latest.spotifyUrl}" target="_blank">Listen on Spotify</a> |
        <a href="${latest.appleUrl}" target="_blank">Apple Podcasts</a>
      </p>
    `;

    container.innerHTML = episodeHTML;
  }
});
