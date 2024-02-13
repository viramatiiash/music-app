const progress = document.getElementById('progress');
const song = document.getElementById('song');
const ctrlIcon = document.getElementById('ctrlIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const volumeIcon = document.getElementById('volumeIcon');

let currentSongIndex = 0;
const songList = [
  {
    id: 1,
    song: './audio/triasovyna.mp3',
    name: 'Трясовина',
    image: './images/triasovyna.jpg',
  },
  {
    id: 2,
    song: './audio/zemlia.mp3',
    name: 'Земля',
    image: './images/zemlia.jpg',
  },
  {
    id: 3,
    song: './audio/fixed.mp3',
    name: 'Fixed',
    image: './images/fixed.jpg',
  },
];

const updateSongDetails = () => {
  const currentSong = songList[currentSongIndex];
  document.getElementById('songName').innerHTML = currentSong.name;
  document.getElementById('song').src = currentSong.song;
  document.querySelector('.song-img').src = currentSong.image;
  song.play();
  ctrlIcon.classList.add('fa-pause');
  ctrlIcon.classList.remove('fa-play');
  setInterval(() => {
    progress.value = song.currentTime;
    currentTimeDisplay.textContent = formatTime(song.currentTime);
  }, 500);
};

const playBackward = () => {
  currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
  updateSongDetails();
};

const playForward = () => {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  updateSongDetails();
};

volumeIcon.addEventListener('click', () => {
  if (volumeControl.style.display === 'none') {
    volumeControl.style.display = 'block';
  } else {
    volumeControl.style.display = 'none';
  }
});

volumeControl.addEventListener('input', function () {
  song.volume = this.value / 100;

  if (volumeControl.value == 0) {
    volumeIcon.classList.remove('fa-volume-high');
    volumeIcon.classList.add('fa-volume-xmark');
  } else {
    volumeIcon.classList.remove('fa-volume-xmark');
    volumeIcon.classList.add('fa-volume-high');
  }
});

song.onloadedmetadata = function () {
  progress.max = song.duration;
  durationDisplay.textContent = formatTime(song.duration);
};

const playPause = () => {
  if (song.paused || song.ended) {
    song.play();
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');

    setInterval(() => {
      progress.value = song.currentTime;
      currentTimeDisplay.textContent = formatTime(song.currentTime);
    }, 500);
  } else {
    song.pause();
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
  }
};

progress.oninput = function () {
  song.currentTime = progress.value;
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
}
