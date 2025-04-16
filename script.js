const video = document.getElementById("video");
const playBtn = document.getElementById("Play");
const stopBtn = document.getElementById("Stop");
const rewindBtn = document.getElementById("Rewind");
const forwardBtn = document.getElementById("Forward");
const prevBtn = document.getElementById("Previousvideo");
const nextBtn = document.getElementById("Nextvideo");
const volumeSlider = document.getElementById("Volume");
const muteBtn = document.getElementById("Mute");
const speedSlider = document.getElementById("Speed");
const seekBar = document.getElementById("SeekBar");
const timeElapsed = document.getElementById("TimeElapsed");
const timeLeft = document.getElementById("TimeLeft");

let playlist = [
  "../Demos/video/big_buck_bunny.mp4",
  "../Demos/video/Moana.mp4",
  "../Demos/video/frozen.mp4",,
];
let currentIndex = 0;

// ---------- Event Listeners ----------

// Play / Pause
playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playBtn.value = "Pause";
  } else {
    video.pause();
    playBtn.value = "Play";
  }
});

// Stop
stopBtn.addEventListener("click", () => {
  video.pause();
  video.currentTime = 0;
  playBtn.value = "Play";
});

// Rewind / Forward
rewindBtn.addEventListener("click", () => {
  video.currentTime = Math.max(video.currentTime - 5, 0);
});

forwardBtn.addEventListener("click", () => {
  video.currentTime = Math.min(video.currentTime + 5, video.duration);
});

// Previous / Next video
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadVideo();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadVideo();
});

function loadVideo() {
  video.src = playlist[currentIndex];
  video.load();
  video.play();
  playBtn.value = "Pause";
}

// Volume control
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value / 100;
});

// Mute toggle
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.value = video.muted ? "Unmute" : "Mute";
});

// Playback speed control
speedSlider.addEventListener("input", () => {
  let speed = 0.25 + (speedSlider.value / 100) * 1.75;
  video.playbackRate = speed;
});

// Time update
video.addEventListener("timeupdate", () => {
  const current = video.currentTime;
  const duration = video.duration;
  seekBar.value = (current / duration) * 100;

  timeElapsed.textContent = formatTime(current);
  timeLeft.textContent = formatTime(duration - current);
});

// SeekBar input
seekBar.addEventListener("input", () => {
  video.currentTime = (seekBar.value / 100) * video.duration;
});

// Helper: format time mm:ss
function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
