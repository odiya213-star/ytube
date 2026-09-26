// App State
let videos = [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'recommended';
let onlyFavorites = false;
let favorites = new Set();
let activePlayingVideo = null;

// LocalStorage Keys (bumped to v2 for verified video IDs)
const STORAGE_VIDEOS_KEY = 'is_audit_videos_v2';
const STORAGE_FAVS_KEY = 'is_audit_favs_v2';

// DOM Elements
const videoGrid = document.getElementById('videoGrid');
const categoryContainer = document.getElementById('categoryContainer');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortSelect = document.getElementById('sortSelect');
const onlyFavoritesBtn = document.getElementById('onlyFavoritesBtn');
const activeCategoryTitle = document.getElementById('activeCategoryTitle');
const filteredCount = document.getElementById('filteredCount');
const totalCount = document.getElementById('totalCount');
const favCount = document.getElementById('favCount');
const emptyState = document.getElementById('emptyState');
const resetFilterBtn = document.getElementById('resetFilterBtn');

// Modals
const playerModal = document.getElementById('playerModal');
const closePlayerBtn = document.getElementById('closePlayerBtn');
const playerIframeContainer = document.getElementById('playerIframeContainer');
const modalCategoryBadge = document.getElementById('modalCategoryBadge');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const modalChannelName = document.getElementById('modalChannelName');
const modalVideoDate = document.getElementById('modalVideoDate');
const modalFavBtn = document.getElementById('modalFavBtn');
const modalFavIcon = document.getElementById('modalFavIcon');
const modalFavText = document.getElementById('modalFavText');
const modalWatchOnYoutube = document.getElementById('modalWatchOnYoutube');

const addVideoModal = document.getElementById('addVideoModal');
const addVideoBtn = document.getElementById('addVideoBtn');
const closeAddModalBtn = document.getElementById('closeAddModalBtn');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addVideoForm = document.getElementById('addVideoForm');
const youtubeDirectBtn = document.getElementById('youtubeDirectBtn');
const toastEl = document.getElementById('toast');

// Init
function initApp() {
  loadData();
  renderCategories();
  bindEvents();
  updateUI();
  lucide.createIcons();
}

// Load data from LocalStorage or default
function loadData() {
  const savedVideos = localStorage.getItem(STORAGE_VIDEOS_KEY);
  if (savedVideos) {
    try {
      videos = JSON.parse(savedVideos);
    } catch (e) {
      videos = [...DEFAULT_VIDEOS];
    }
  } else {
    videos = [...DEFAULT_VIDEOS];
    saveVideos();
  }

  const savedFavs = localStorage.getItem(STORAGE_FAVS_KEY);
  if (savedFavs) {
    try {
      favorites = new Set(JSON.parse(savedFavs));
    } catch (e) {
      favorites = new Set();
    }
  }
}

function saveVideos() {
  localStorage.setItem(STORAGE_VIDEOS_KEY, JSON.stringify(videos));
}

function saveFavorites() {
  localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(Array.from(favorites)));
}

// Show Toast
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

// Extract YouTube ID from various URL patterns
function extractYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Render Categories
function renderCategories() {
  categoryContainer.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-btn ${cat.id === currentCategory ? 'active' : ''}`;
    btn.setAttribute('data-id', cat.id);
    
    // Count per category
    let count = 0;
    if (cat.id === 'all') {
      count = videos.length;
    } else {
      count = videos.filter(v => v.category === cat.id).length;
    }

    btn.innerHTML = `
      <i data-lucide="${cat.icon}"></i>
      <span>${cat.name}</span>
      <span class="badge">${count}</span>
    `;

    btn.addEventListener('click', () => {
      currentCategory = cat.id;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateUI();
    });

    categoryContainer.appendChild(btn);
  });
}

// Filter and sort videos
function getFilteredVideos() {
  return videos.filter(video => {
    // Category filter
    if (currentCategory !== 'all' && video.category !== currentCategory) {
      return false;
    }
    // Favorite filter
    if (onlyFavorites && !favorites.has(video.id)) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatch = (video.title || '').toLowerCase().includes(q);
      const descMatch = (video.description || '').toLowerCase().includes(q);
      const channelMatch = (video.channel || '').toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !channelMatch) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (currentSort === 'newest') {
      return new Date(b.date || 0) - new Date(a.date || 0);
    }
    if (currentSort === 'views') {
      return (b.views || 0) - (a.views || 0);
    }
    // recommended: keep initial curated order or priority
    return 0;
  });
}

// Render Video Grid
function updateUI() {
  const filtered = getFilteredVideos();
  
  // Update Stats
  totalCount.textContent = videos.length;
  favCount.textContent = favorites.size;
  filteredCount.textContent = filtered.length;

  const currentCatObj = CATEGORIES.find(c => c.id === currentCategory);
  activeCategoryTitle.textContent = currentCatObj ? currentCatObj.name : '전체 영상';

  if (filtered.length === 0) {
    videoGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    videoGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    renderVideoCards(filtered);
  }

  // Refresh lucide icons
  lucide.createIcons();
}

function getCategoryName(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  return cat ? cat.name : '감리사';
}

function formatViews(num) {
  if (!num) return '1천회';
  if (num >= 10000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만회';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + '천회';
  }
  return num + '회';
}

function renderVideoCards(videoList) {
  videoGrid.innerHTML = '';

  videoList.forEach(video => {
    const isFav = favorites.has(video.id);
    const card = document.createElement('div');
    card.className = 'video-card';
    
    // High quality YouTube thumbnail
    const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    
    card.innerHTML = `
      <div class="thumbnail-wrap">
        <span class="category-tag">${getCategoryName(video.category)}</span>
        <button class="fav-card-btn ${isFav ? 'favorited' : ''}" data-video-id="${video.id}" title="${isFav ? '즐겨찾기 해제' : '즐겨찾기 저장'}">
          <i data-lucide="bookmark"></i>
        </button>
        <img class="thumbnail-img" src="${thumbUrl}" alt="${video.title}" loading="lazy" onerror="if(!this.dataset.triedMq){this.dataset.triedMq=1;this.src='https://img.youtube.com/vi/${video.id}/mqdefault.jpg';}else{this.src='https://via.placeholder.com/640x360/1e293b/94a3b8?text='+encodeURIComponent(this.alt);}">
        <div class="play-overlay">
          <div class="play-btn-circle">
            <i data-lucide="play" style="fill: white; margin-left: 3px;"></i>
          </div>
        </div>
        <span class="video-duration">${video.duration || '강의'}</span>
      </div>
      <div class="card-body">
        <h4 class="card-title" title="${video.title}">${video.title}</h4>
        <p class="card-desc">${video.description || '정보시스템감리사 핵심 강좌 및 학습 요약'}</p>
        <div class="card-meta">
          <span class="channel-name">${video.channel}</span>
          <div class="views-date">
            <span>조회수 ${formatViews(video.views)}</span>
            <span>·</span>
            <span>${video.date || '최근'}</span>
          </div>
        </div>
      </div>
    `;

    // Click card to open player
    card.addEventListener('click', (e) => {
      // If clicking bookmark button, toggle favorite instead
      if (e.target.closest('.fav-card-btn')) {
        e.stopPropagation();
        toggleFavorite(video.id);
        return;
      }
      openPlayer(video);
    });

    videoGrid.appendChild(card);
  });
}

// Favorites Toggle
function toggleFavorite(videoId) {
  if (favorites.has(videoId)) {
    favorites.delete(videoId);
    showToast('즐겨찾기에서 제거되었습니다.');
  } else {
    favorites.add(videoId);
    showToast('즐겨찾기에 저장되었습니다! ⭐');
  }
  saveFavorites();
  
  if (activePlayingVideo && activePlayingVideo.id === videoId) {
    updateModalFavButton(videoId);
  }
  
  updateUI();
}

function updateModalFavButton(videoId) {
  const isFav = favorites.has(videoId);
  if (isFav) {
    modalFavBtn.classList.add('favorited');
    modalFavText.textContent = '즐겨찾기 해제';
    modalFavIcon.setAttribute('fill', '#f59e0b');
  } else {
    modalFavBtn.classList.remove('favorited');
    modalFavText.textContent = '즐겨찾기 추가';
    modalFavIcon.removeAttribute('fill');
  }
}

// Open YouTube Player Modal
function openPlayer(video) {
  activePlayingVideo = video;
  modalCategoryBadge.textContent = getCategoryName(video.category);
  modalVideoTitle.textContent = video.title;
  modalChannelName.textContent = video.channel;
  modalVideoDate.textContent = `${video.date || '최신'} · 조회수 ${formatViews(video.views)}`;
  modalWatchOnYoutube.href = `https://www.youtube.com/watch?v=${video.id}`;

  updateModalFavButton(video.id);

  // YouTube Embed URL with origin and referrerpolicy to prevent Error 153
  const currentOrigin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'https://www.youtube.com';
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(currentOrigin)}`;

  // Embed iframe with autoplay & referrerpolicy
  playerIframeContainer.innerHTML = `
    <iframe 
      src="${embedUrl}" 
      title="${video.title}" 
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  `;

  playerModal.classList.add('open');
  lucide.createIcons();
}

function closePlayer() {
  playerModal.classList.remove('open');
  // clear iframe to stop audio
  playerIframeContainer.innerHTML = '';
  activePlayingVideo = null;
}

// Bind Events
function bindEvents() {
  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    updateUI();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    updateUI();
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    updateUI();
  });

  // Only Favorites Toggle
  onlyFavoritesBtn.addEventListener('click', () => {
    onlyFavorites = !onlyFavorites;
    if (onlyFavorites) {
      onlyFavoritesBtn.classList.add('active');
    } else {
      onlyFavoritesBtn.classList.remove('active');
    }
    updateUI();
  });

  // Reset Filters
  resetFilterBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    currentCategory = 'all';
    onlyFavorites = false;
    onlyFavoritesBtn.classList.remove('active');
    renderCategories();
    updateUI();
  });

  // Player Modal Events
  closePlayerBtn.addEventListener('click', closePlayer);
  playerModal.addEventListener('click', (e) => {
    if (e.target === playerModal) {
      closePlayer();
    }
  });

  modalFavBtn.addEventListener('click', () => {
    if (activePlayingVideo) {
      toggleFavorite(activePlayingVideo.id);
    }
  });

  // Direct YouTube Search Button
  youtubeDirectBtn.addEventListener('click', () => {
    const q = searchQuery.trim() || '정보시스템감리사';
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, '_blank');
  });

  // Add Custom Video Modal
  addVideoBtn.addEventListener('click', () => {
    addVideoModal.classList.add('open');
  });

  const closeAddModal = () => {
    addVideoModal.classList.remove('open');
    addVideoForm.reset();
  };

  closeAddModalBtn.addEventListener('click', closeAddModal);
  cancelAddBtn.addEventListener('click', closeAddModal);
  addVideoModal.addEventListener('click', (e) => {
    if (e.target === addVideoModal) closeAddModal();
  });

  // Add Video Form Submit
  addVideoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('newVideoUrl').value;
    const videoId = extractYouTubeId(url);

    if (!videoId) {
      alert('유효한 YouTube 영상 URL 또는 영상 ID를 입력해 주세요.');
      return;
    }

    // Check duplicate
    if (videos.some(v => v.id === videoId)) {
      alert('이미 등록되어 있는 영상입니다.');
      return;
    }

    const title = document.getElementById('newVideoTitle').value.trim();
    const channel = document.getElementById('newVideoChannel').value.trim();
    const category = document.getElementById('newVideoCategory').value;
    const desc = document.getElementById('newVideoDesc').value.trim();

    const newVideo = {
      id: videoId,
      title: title,
      channel: channel,
      category: category,
      views: 1200,
      date: new Date().toISOString().split('T')[0],
      duration: '신규등록',
      description: desc || '직접 추가한 정보시스템감리사 학습 영상'
    };

    videos.unshift(newVideo);
    saveVideos();
    closeAddModal();
    renderCategories();
    updateUI();
    showToast('새로운 감리사 영상이 등록되었습니다! 🎉');
  });

  // Keyboard shortcut (Escape closes modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (playerModal.classList.contains('open')) closePlayer();
      if (addVideoModal.classList.contains('open')) closeAddModal();
    }
  });
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
