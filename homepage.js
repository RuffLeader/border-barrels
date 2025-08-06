// homepage.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("latest-episode-container");
  if (!container) return; // Not homepage, exit early

  // Example dynamic code for homepage
  const latestEpisode = {
    number: 75,
    title: "Tar Barrel Brewery & Distillery Showcase",
    youtubeId: "t345ctH2l0k",
    spotifyUrl: "https://open.spotify.com/episode/3OhWOrVnvynNfpqvMJGSM3",
    appleUrl: "https://podcasts.apple.com/au/podcast/beercast-75-tar-barrel-brewery-distillery/id1559619911?i=1000716071590",
    description: "It was a boozy Sunday afternoon in the Border Barrels studio, as Gratzy (via his wife) supplied the boys with FIVE delicious beers from Mornington's hidden gem Tar Barrel Brewery & Distillery."
  };

  // Render a simple card for the latest episode
  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${latestEpisode.youtubeId}/hqdefault.jpg" alt="Thumbnail for Episode ${latestEpisode.number}">
    <div class="links">
      <a href="https://www.youtube.com/watch?v=${latestEpisode.youtubeId}" target="_blank">YouTube</a>
      <a href="${latestEpisode.spotifyUrl}" target="_blank">Spotify</a>
      <a href="${latestEpisode.appleUrl}" target="_blank">Apple</a>
    </div>
    <div class="episode-info">
      <div class="episode-number">Episode ${latestEpisode.number}</div>
      <div class="episode-title">${latestEpisode.title}</div>
      <p class="description">${latestEpisode.description}</p>
    </div>
  `;

  container.appendChild(card);
});
