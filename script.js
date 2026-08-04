let userData = null;
let currentLyricIndex = -1;
let songDuration = 60;
let isPlaying = false;
let isFirstInteraction = true;

const profilePic = document.getElementById('profilePic');
const profileName = document.getElementById('profileName');
const profileBio = document.getElementById('profileBio');
const linksContainer = document.getElementById('linksContainer');
const currentYear = document.getElementById('currentYear');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const lyrics = document.getElementById('lyrics');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const musicPlayer = document.getElementById('musicPlayer');
const musicToggle = document.getElementById('musicToggle');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const welcomePanel = document.getElementById('welcomePanel');
const welcomeCloseBtn = document.getElementById('welcomeCloseBtn');
const audioPlayer = document.getElementById('audioPlayer');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const linkSearch = document.getElementById('linkSearch');
const qrModal = document.getElementById('qrModal');
const shareBtn = document.getElementById('shareBtn');
const qrCloseBtn = document.getElementById('qrCloseBtn');
const copyShareUrlBtn = document.getElementById('copyShareUrlBtn');
const shareUrlInput = document.getElementById('shareUrlInput');

function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 127, ${p.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff007f';
            ctx.fill();
        });

        requestAnimationFrame(render);
    }
    render();
}

function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function checkWelcomePanel() {
    const lastVisit = localStorage.getItem('lastVisit_mikorayuki');
    const currentTime = new Date().getTime();

    if (!lastVisit || (currentTime - parseInt(lastVisit)) > 300000) {
        welcomePanel.classList.add('visible');
        localStorage.setItem('lastVisit_mikorayuki', currentTime.toString());
    }
}

welcomeCloseBtn.addEventListener('click', () => {
    welcomePanel.classList.remove('visible');
});

function initThemeSwitcher() {
    const btns = document.querySelectorAll('.theme-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const theme = btn.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', theme);
            }
        });
    });
}

function renderLinks(links) {
    linksContainer.innerHTML = '';

    links.forEach((link) => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'link-card';

        const left = document.createElement('div');
        left.className = 'link-card-left';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'link-icon-wrap';
        const icon = document.createElement('i');
        icon.className = link.icon;
        iconWrap.appendChild(icon);

        const textWrap = document.createElement('div');
        textWrap.className = 'link-card-text';
        const h3 = document.createElement('h3');
        h3.textContent = link.title;
        const p = document.createElement('p');
        p.textContent = link.url.replace(/^https?:\/\//, '');

        textWrap.appendChild(h3);
        textWrap.appendChild(p);

        left.appendChild(iconWrap);
        left.appendChild(textWrap);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.title = 'Salin Tautan';
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';

        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(link.url).then(() => {
                showToast(`Tautan ${link.title} berhasil disalin!`);
            });
        });

        card.appendChild(left);
        card.appendChild(copyBtn);

        linksContainer.appendChild(card);
    });
}

function initSearch(links) {
    linkSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = links.filter(l => l.title.toLowerCase().includes(query) || l.url.toLowerCase().includes(query));
        renderLinks(filtered);
    });
}

function initializeFromJSON(data) {
    userData = data;

    profileName.textContent = data.profile.name;
    profileBio.textContent = data.profile.bio;
    profilePic.src = data.profile.image;

    renderLinks(data.links);
    initSearch(data.links);

    songTitle.textContent = data.music.title;
    artist.textContent = data.music.artist;
    albumArt.src = data.music.albumArt;

    if (data.music.audioFile) {
        audioPlayer.src = data.music.audioFile;

        audioPlayer.addEventListener('loadedmetadata', function () {
            songDuration = audioPlayer.duration;
            totalTimeDisplay.textContent = formatTime(songDuration);
        });

        audioPlayer.addEventListener('timeupdate', function () {
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            const percent = (audioPlayer.currentTime / songDuration) * 100;
            progressBar.style.width = `${percent}%`;

            updateLyricsDisplay(audioPlayer.currentTime);
        });

        audioPlayer.addEventListener('ended', function () {
            audioPlayer.currentTime = 0;
            if (isPlaying) {
                audioPlayer.play();
            } else {
                isPlaying = false;
                playPauseIcon.className = 'fas fa-play';
                musicPlayer.classList.remove('playing');
            }
        });
    } else {
        songDuration = data.music.duration || 267;
        totalTimeDisplay.textContent = formatTime(songDuration);
    }

    if (data.music.timeSync) {
        updateLyricsDisplay(0);
    }

    currentYear.textContent = new Date().getFullYear().toString();
}

function updateLyricsDisplay(time) {
    if (!userData || !userData.music.timeSync) return;

    let lyricArray = userData.music.timeSync;
    if (Array.isArray(lyricArray) && lyricArray.length > 0 && Array.isArray(lyricArray[0])) {
        lyricArray = lyricArray[0];
    }

    let currentLyric = null;
    let newLyricIndex = -1;

    for (let i = 0; i < lyricArray.length; i++) {
        if (lyricArray[i].time <= time) {
            currentLyric = lyricArray[i];
            newLyricIndex = i;
        } else {
            break;
        }
    }

    if (currentLyric && newLyricIndex !== currentLyricIndex) {
        currentLyricIndex = newLyricIndex;
        lyrics.textContent = currentLyric.text;
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function togglePlayPause() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playPauseIcon.className = 'fas fa-pause';
        musicPlayer.classList.add('playing');
        if (audioPlayer.src) {
            audioPlayer.play();
        }
    } else {
        playPauseIcon.className = 'fas fa-play';
        musicPlayer.classList.remove('playing');
        if (audioPlayer.src) {
            audioPlayer.pause();
        }
    }
}

musicToggle.addEventListener('click', () => {
    musicPlayer.classList.toggle('collapsed');
});

playPauseBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    togglePlayPause();
});

document.getElementById('progressContainer').addEventListener('click', function (e) {
    if (audioPlayer.src) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * songDuration;
    }
});

shareBtn.addEventListener('click', () => {
    shareUrlInput.value = window.location.href;
    qrModal.classList.add('visible');
});

qrCloseBtn.addEventListener('click', () => {
    qrModal.classList.remove('visible');
});

copyShareUrlBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        showToast('Tautan profil berhasil disalin!');
        qrModal.classList.remove('visible');
    });
});

document.addEventListener('click', function playOnFirstInteraction() {
    if (isFirstInteraction) {
        isFirstInteraction = false;
        if (!isPlaying) {
            togglePlayPause();
        }
        document.removeEventListener('click', playOnFirstInteraction);
    }
}, true);

document.addEventListener('DOMContentLoaded', function () {
    initCanvasBackground();
    initThemeSwitcher();
    checkWelcomePanel();

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeFromJSON(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});