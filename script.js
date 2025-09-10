async function updateLastFM() {
  const username = "misiu21";
  const apiKey = "593fabf32092080ee2b6fad842570c30";
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const track = data.recenttracks.track[0];

    const isNowPlaying = track['@attr']?.nowplaying === "true";
    const artist = track.artist['#text'];
    const name = track.name.replace(/\s*[\(\[].*?[\)\]]/g, '').trim();
    const link = track.url;
    const image = track.image?.find(img => img.size === "extralarge")?.['#text'] || '';
    const uts = track.date?.uts;

    const songEl = document.getElementById("song");
    const statusEl = document.getElementById("status");
    const coverEl = document.getElementById("cover");
    const lastfmProfileUrl = "http://last.fm/user/kitachiii07";
    const artistUrl = `https://www.last.fm/music/${encodeURIComponent(artist.replace(/ /g, '+'))}`;
    
songEl.innerHTML = `
  <a href="${link}" target="_blank" class="song-link song-name nav">${name}</a>
  <br><br>
  <a href="${artistUrl}" target="_blank" class="song-link artist-name nav">${artist}</a>
`;


if (isNowPlaying) {
  statusEl.innerHTML = `<span class="shimmer">Song currently listening</span> <a href="${lastfmProfileUrl}" target="_blank" rel="noopener noreferrer"></a>`;
} else if (uts) {
  const secondsAgo = Math.floor(Date.now() / 1000) - parseInt(uts);
  const minutes = Math.floor(secondsAgo / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeAgo = "";
  if (days > 0) timeAgo = `${days} day${days > 1 ? "s" : ""}`;
  else if (hours > 0) timeAgo = `${hours} hour${hours > 1 ? "s" : ""}`;
  else if (minutes > 0) timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  else timeAgo = `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""}`;

  statusEl.innerHTML = `Song listened ${timeAgo} ago <a href="${lastfmProfileUrl}" target="_blank" rel="noopener noreferrer"></a>`;
}

    if (image) {
      coverEl.src = image;
      coverEl.alt = `${name} cover`;
    } else {
      coverEl.src = "";
    }
  } catch (error) {
    console.error("failed to fetch last.fm data:", error);
    document.getElementById("song").textContent = "fetch error";
    document.getElementById("cover").src = "";
  }
}

updateLastFM();
setInterval(updateLastFM, 60 * 1000);

function formatSongLink() {
  const songLink = document.querySelector(".song-link");
  if (!songLink) return;

  if (window.innerWidth <= 600) {
    songLink.innerHTML = songLink.textContent.replace(/ *[–\-•] */g, "<br>");
  } else {
    songLink.innerHTML = songLink.textContent.replace(/\n/g, " - ");
  }
}
formatSongLink()



document.addEventListener("DOMContentLoaded", () => {
  // ---- Custom cursor ----
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  document.addEventListener("click", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
    setTimeout(() => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    }, 150);
  });

  // ---- Dark mode toggle z zapamiętywaniem ----
  const toggle = document.querySelector(".dark-toggle");
  if (toggle) {
    // ustawienie trybu przy ładowaniu strony
    const darkModeStored = localStorage.getItem("darkMode");
    if (darkModeStored === "true") {
      document.body.classList.add("dark");
      toggle.textContent = "☀️";
    } else {
      toggle.textContent = "🌙";
    }

    // toggle przy kliknięciu
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      toggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark);
    });
  }

  // ---- Typewriter effect ----
  const typewriter = document.getElementById("typewriter");
  if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = "";
    let i = 0;
    const typing = setInterval(() => {
      typewriter.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 100);
  }
});






