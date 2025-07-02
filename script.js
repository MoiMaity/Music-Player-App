const songs = [
    { id: 1, name: "Song A", artist: "Artist A", img: "img1.jpg", genre: "pop", source: "song1.mp3" },
    { id: 2, name: "Song B", artist: "Artist B", img: "img2.jpg", genre: "rock", source: "song2.mp3" },
    { id: 3, name: "Song C", artist: "Artist C", img: "img3.jpg", genre: "jazz", source: "song3.mp3" },
  ];
  
  let currentSongIndex = 0;
  let playlists = {};
  let theme = "light";
  
  const songList = document.getElementById("songList");
  const songImage = document.getElementById("songImage");
  const songName = document.getElementById("songName");
  const artistName = document.getElementById("artistName");
  const themeToggle = document.getElementById("themeToggle");
  const genreFilter = document.getElementById("genreFilter");
  const newPlaylistName = document.getElementById("newPlaylistName");
  const playlistList = document.getElementById("playlistList");
  
  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
  }
  
  function renderSongs(genre = "all") {
    songList.innerHTML = "";
    const filteredSongs = genre === "all" ? songs : songs.filter(song => song.genre === genre);
    filteredSongs.forEach(song => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener("click", () => playSong(songs.indexOf(song)));
      songList.appendChild(li);
    });
  }
  
  function renderCurrentSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.img;
    songName.textContent = song.name;
    artistName.textContent = song.artist;
  }
  
  function playSong(index) {
    currentSongIndex = index;
    renderCurrentSong();
  }
  
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
  }
  
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
  }
  
  function createPlaylist() {
    const name = newPlaylistName.value.trim();
    if (name && !playlists[name]) {
      playlists[name] = [];
      renderPlaylists();
      newPlaylistName.value = "";
    }
  }
  
  function renderPlaylists() {
    playlistList.innerHTML = "";
    Object.keys(playlists).forEach(playlist => {
      const li = document.createElement("li");
      li.textContent = playlist;
      li.addEventListener("click", () => showPlaylist(playlist));
      playlistList.appendChild(li);
    });
  }
  
  function showPlaylist(name) {
    const playlistSongs = playlists[name];
    songList.innerHTML = "";
    playlistSongs.forEach(song => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener("click", () => playSong(songs.indexOf(song)));
      songList.appendChild(li);
    });
  }
  
  function addToPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && playlists[playlistName]) {
      playlists[playlistName].push(songs[currentSongIndex]);
      alert(`Song added to ${playlistName}`);
    }
  }
  

  themeToggle.addEventListener("click", toggleTheme);
  genreFilter.addEventListener("change", () => renderSongs(genreFilter.value));
  document.getElementById("nextButton").addEventListener("click", nextSong);
  document.getElementById("prevButton").addEventListener("click", prevSong);
  document.getElementById("addToPlaylist").addEventListener("click", addToPlaylist);
  document.getElementById("createPlaylist").addEventListener("click", createPlaylist);
  

  renderSongs();
  renderPlaylists();
  renderCurrentSong();
  