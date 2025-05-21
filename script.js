// DOM Elements
const video = document.getElementById('mainVideo');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeControl = document.getElementById('volumeControl');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const speedSelect = document.getElementById('speedSelect');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Play/Pause Functionality
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// Mute/Unmute Functionality
function toggleMute() {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeControl.value = video.volume;
    } else {
        video.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        volumeControl.value = 0;
    }
}

muteBtn.addEventListener('click', toggleMute);

// Volume Control
function setVolume() {
    video.volume = volumeControl.value;
    if (video.volume > 0) {
        video.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

volumeControl.addEventListener('input', setVolume);

// Progress Bar Update
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.value = percent;
    
    // Update time displays
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    if (video.duration) {
        durationDisplay.textContent = formatTime(video.duration);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

video.addEventListener('timeupdate', updateProgress);

// Seek Functionality
function setProgress(e) {
    const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = newTime;
}

progressBar.addEventListener('click', setProgress);

// Playback Speed
function setSpeed() {
    video.playbackRate = speedSelect.value;
}

speedSelect.addEventListener('change', setSpeed);

// Fullscreen Functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    }
    
    if (e.code === 'ArrowRight') {
        video.currentTime += 5;
    }
    
    if (e.code === 'ArrowLeft') {
        video.currentTime -= 5;
    }
    
    if (e.code === 'ArrowUp') {
        if (video.volume < 1) {
            video.volume = Math.min(video.volume + 0.1, 1);
            volumeControl.value = video.volume;
        }
    }
    
    if (e.code === 'ArrowDown') {
        if (video.volume > 0) {
            video.volume = Math.max(video.volume - 0.1, 0);
            volumeControl.value = video.volume;
        }
    }
    
    if (e.code === 'KeyM') {
        toggleMute();
    }
    
    if (e.code === 'KeyF') {
        toggleFullscreen();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Initialize video metadata when loaded
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
});
