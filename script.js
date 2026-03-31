/**
 * Original Warm Wedding Invitation
 * Korean Mobile 청첩장 - Script
 * (Original aiWedding-main design, new architecture)
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     Utility Helpers
     ═══════════════════════════════════════════ */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function formatDateShort(dateStr, timeStr) {
    const d = new Date(`${dateStr}T${timeStr}:00`);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const day = days[d.getDay()];
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours < 12 ? 'AM' : 'PM';
    const h12 = hours % 12 || 12;
    const minuteStr = String(minutes).padStart(2, '0');
    return `${year}. ${month}. ${date} ${day} ${period} ${h12}:${minuteStr}`;
  }

  function getWeddingDateTime() {
    return new Date(`${CONFIG.wedding.date}T${CONFIG.wedding.time}:00+09:00`);
  }

  /* ═══════════════════════════════════════════
     Image Auto-Detection
     ═══════════════════════════════════════════ */

  function getImageList(folder, count) {
   return Array.from({ length: count }, (_, i) => 
    `images/${folder}/${i + 1}.jpg`
    );
  }

  /* ═══════════════════════════════════════════
     Toast
     ═══════════════════════════════════════════ */

  let toastTimer = null;
  function showToast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2500);
  }

  /* ═══════════════════════════════════════════
     Clipboard
     ═══════════════════════════════════════════ */

  async function copyToClipboard(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast(successMsg || '복사되었습니다');
    } catch {
      showToast('복사에 실패했습니다');
    }
  }

  /* ═══════════════════════════════════════════
     OG Meta Tags
     ═══════════════════════════════════════════ */

  function setMetaTags() {
    const m = CONFIG.meta;
    document.title = m.title;
    const setMeta = (attr, val, content) => {
      const el = document.querySelector(`meta[${attr}="${val}"]`);
      if (el) el.setAttribute('content', content);
    };
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:image', 'm.image');
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);
    setMeta('name', 'twitter:image', 'images/og/1.jpg');
    setMeta('name', 'description', m.description);
  }

  /* ═══════════════════════════════════════════
     Curtain
     ═══════════════════════════════════════════ */

  function initCurtain() {
    const curtain = $('#curtainOverlay');
    if (!curtain) return;

    if (CONFIG.useCurtain === false) {
      curtain.style.display = 'none';
      return;
    }

    setTimeout(() => {
      curtain.classList.add('hidden');
    }, 2200);
  }

  /* ═══════════════════════════════════════════
     Petal Animation
     ═══════════════════════════════════════════ */

  function initPetals() {
    function createPetalsContainer() {
      const container = document.createElement('div');
      container.className = 'petals-container';
      document.body.appendChild(container);
      return container;
    }

    function createPetal(container) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      const startX = Math.random() * 100;
      const size = Math.random() * 8 + 8;
      const duration = Math.random() * 4 + 6;
      const delay = Math.random() * 0.5;

      petal.style.left = startX + 'vw';
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.animationDuration = duration + 's';
      petal.style.animationDelay = delay + 's';

      container.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, (duration + delay) * 1000 + 100);
    }

    const container = createPetalsContainer();
    let petalCount = 0;
    const maxPetals = 40;

    const interval = setInterval(() => {
      if (petalCount >= maxPetals) {
        clearInterval(interval);
        setTimeout(() => {
          container.remove();
        }, 12000);
        return;
      }
      createPetal(container);
      if (Math.random() > 0.5) createPetal(container);
      petalCount++;
    }, 400);
  }

  /* ═══════════════════════════════════════════
     Hero Section
     ═══════════════════════════════════════════ */

  function initHero() {
    const heroImg = $('#heroImage');
    if (heroImg) heroImg.src = 'images/hero/1.jpg';

    $('#heroDate').textContent = formatDateShort(CONFIG.wedding.date, CONFIG.wedding.time);
    $('#heroNames').textContent = `${CONFIG.groom.name} & ${CONFIG.bride.name}`;
    $('#heroVenue').textContent = CONFIG.wedding.venue;

    // Parents info
    const g = CONFIG.groom;
    const b = CONFIG.bride;

    function parentSpan(name, deceased) {
      return deceased ? `<span class="parent-names deceased">${name}</span>` : `<span class="parent-names">${name}</span>`;
    }

    const parentsHTML = `
      <p class="parent-line">${parentSpan(g.father, g.fatherDeceased)} · ${parentSpan(g.mother, g.motherDeceased)}의 아들 <span class="child-name">${g.name}</span></p>
      <p class="parent-line">${parentSpan(b.father, b.fatherDeceased)} · ${parentSpan(b.mother, b.motherDeceased)}의 딸 <span class="child-name">${b.name}</span></p>
    `;
    $('#heroParents').innerHTML = parentsHTML;

    // Fix mobile viewport height
    const heroContainer = $('.hero-image-container');
    if (heroContainer) {
      const setFixedHeight = () => {
        heroContainer.style.height = heroContainer.offsetHeight + 'px';
      };
      if (document.readyState === 'complete') {
        setFixedHeight();
      } else {
        window.addEventListener('load', setFixedHeight);
      }
    }
  }

  /* ═══════════════════════════════════════════
     Countdown
     ═══════════════════════════════════════════ */

  function initCountdown() {
    const target = getWeddingDateTime();

    function update() {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        $('#countdown-days').textContent = '0';
        $('#countdown-hours').textContent = '0';
        $('#countdown-minutes').textContent = '0';
        $('#countdown-seconds').textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      $('#countdown-days').textContent = days;
      $('#countdown-hours').textContent = hours;
      $('#countdown-minutes').textContent = minutes;
      $('#countdown-seconds').textContent = seconds;
    }

    update();
    setInterval(update, 1000);
  }

  /* ═══════════════════════════════════════════
     Calendar (Google Cal & ICS)
     ═══════════════════════════════════════════ */

  function initCalendar() {
    const dt = getWeddingDateTime();
    const startDate = dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDt = new Date(dt.getTime() + 2 * 60 * 60 * 1000);
    const endDate = endDt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CONFIG.groom.name + ' ♥ ' + CONFIG.bride.name + ' 결혼식')}&dates=${startDate}/${endDate}&location=${encodeURIComponent(CONFIG.wedding.venue + ' ' + CONFIG.wedding.address)}&details=${encodeURIComponent('결혼식에 초대합니다.')}`;
    const googleBtn = $('#googleCalBtn');
    if (googleBtn) googleBtn.href = gcalUrl;

    const icsBtn = $('#icsDownloadBtn');
    if (icsBtn) {
      icsBtn.addEventListener('click', () => {
        const icsContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Wedding//Invitation//KO',
          'BEGIN:VEVENT',
          `DTSTART:${startDate}`,
          `DTEND:${endDate}`,
          `SUMMARY:${CONFIG.groom.name} ♥ ${CONFIG.bride.name} 결혼식`,
          `LOCATION:${CONFIG.wedding.venue} ${CONFIG.wedding.address}`,
          'DESCRIPTION:결혼식에 초대합니다.',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wedding.ics';
        a.click();
        URL.revokeObjectURL(url);
        showToast('캘린더 파일이 다운로드됩니다');
      });
    }
  }

  /* ═══════════════════════════════════════════
     Story Section
     ═══════════════════════════════════════════ */

  function initStory(storyImages) {
    $('#storyTitle').textContent = CONFIG.story.title;
    $('#storyContent').textContent = CONFIG.story.content;

    const topContainer = $('#storyPhotos');
    const bottomContainer = $('#storyPhotosBottom');

    // Remove loading placeholder
    const placeholder = topContainer.querySelector('.loading-placeholder');
    if (placeholder) placeholder.remove();
    const placeholder2 = bottomContainer.querySelector('.loading-placeholder');
    if (placeholder2) placeholder2.remove();

    if (storyImages.length === 0) return;

    // Place first story image above text, rest below (matching original layout)
    storyImages.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'story-image-container fade-in-left';
      div.innerHTML = `<img src="${src}" alt="스토리 사진 ${i + 1}" loading="lazy">`;
      div.addEventListener('click', () => openViewer(storyImages, i));

      if (i === 0) {
        topContainer.appendChild(div);
      } else {
        // Alternate animation direction
        div.className = 'story-image-container ' + (i % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        bottomContainer.appendChild(div);
      }
    });

    // Re-observe new elements for scroll animations
    observeNewElements();
  }

  /* ═══════════════════════════════════════════
     Gallery Section
     ═══════════════════════════════════════════ */

  let galleryImagesList = [];

  function initGallery(galleryImages) {
  galleryImagesList = galleryImages;
  const grid = $('#galleryGrid');

  const placeholder = grid.querySelector('.loading-placeholder');
  if (placeholder) placeholder.remove();

  if (galleryImages.length === 0) {
    const section = $('#gallerySection');
    if (section) section.style.display = 'none';
    return;
  }

  galleryImages.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-index', i);
    div.innerHTML = `<img src="${src}" alt="갤러리 사진 ${i + 1}" loading="eager">`;
    div.addEventListener('click', () => openViewer(galleryImages, i));
    grid.appendChild(div);
  });

  $('#totalCount').textContent = galleryImages.length;
}

  /* ═══════════════════════════════════════════
     Photo Viewer (with swipe)
     ═══════════════════════════════════════════ */

let viewerImages = [];
let viewerIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function lockBodyScroll() {
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
}

function unlockBodyScroll() {
  document.body.classList.remove('no-scroll');
  document.documentElement.classList.remove('no-scroll');
}

function openViewer(images, index) {
  viewerImages = images;
  viewerIndex = index;
  showViewerImage();
  $('#photoViewer').classList.add('active');
  lockBodyScroll();
}

function closeViewer() {
  $('#photoViewer').classList.remove('active');
  unlockBodyScroll();
  const img = $('#viewerImage');
  if (img) img.style.transform = '';
}

  function showViewerImage() {
    const img = $('#viewerImage');
    const loading = $('#viewerLoading');
    loading.classList.remove('hidden');
    img.style.opacity = '0';

    img.src = viewerImages[viewerIndex];
    $('#currentIndex').textContent = viewerIndex + 1;
    $('#totalCount').textContent = viewerImages.length;
  }

  function navigateViewer(direction) {
    const img = $('#viewerImage');
    img.classList.add('fade-out');

    setTimeout(() => {
      if (direction === 'prev') {
        viewerIndex = (viewerIndex - 1 + viewerImages.length) % viewerImages.length;
      } else {
        viewerIndex = (viewerIndex + 1) % viewerImages.length;
      }
      showViewerImage();
      img.classList.remove('fade-out');
    }, 200);
  }

  function initPhotoViewer() {
    const viewer = $('#photoViewer');
    const viewerImage = $('#viewerImage');
    const viewerLoading = $('#viewerLoading');

    $('#viewerClose').addEventListener('click', closeViewer);
    $('#viewerPrev').addEventListener('click', () => navigateViewer('prev'));
    $('#viewerNext').addEventListener('click', () => navigateViewer('next'));

    // Image load/error
    viewerImage.addEventListener('load', () => {
      viewerLoading.classList.add('hidden');
      viewerImage.style.opacity = '1';
    });
    viewerImage.addEventListener('error', () => {
      viewerLoading.classList.add('hidden');
      viewerImage.style.opacity = '1';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('active')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') navigateViewer('prev');
      if (e.key === 'ArrowRight') navigateViewer('next');
    });

    // Touch swipe
    let isSingleTouch = false;
    const content = $('#viewerContent');

    content.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isSingleTouch = true;
        touchStartX = e.touches[0].clientX;
      } else {
        isSingleTouch = false;
      }
    }, { passive: true });

    content.addEventListener('touchend', (e) => {
      if (!isSingleTouch) return;
      touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;
      const swipeThreshold = 50;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          navigateViewer('next');
        } else {
          navigateViewer('prev');
        }
      }
    });
  }


 

  /* ═══════════════════════════════════════════
     Location Section
     ═══════════════════════════════════════════ */

  function initLocation() {
    const w = CONFIG.wedding;
    $('#locationVenue').textContent = w.venue;
    $('#locationAddress').textContent = w.address;
    $('#kakaoMapBtn').href = w.mapLinks.kakao || '#';
    $('#naverMapBtn').href = w.mapLinks.naver || '#';
    $('#tmapMapBtn').href = w.mapLinks.tmap || '#';

    $('#copyAddressBtn').addEventListener('click', () => {
      copyToClipboard(w.address, '주소가 복사되었습니다');
    });
  }
  let kakaoMapInstance = null;
  let kakaoMapCenter = null;

  function initKakaoMap() {
    const mapEl = document.getElementById('kakaoMap');
    if (!mapEl) return;

    const venueName = CONFIG.wedding.venue;
    const address = CONFIG.wedding.address;

    function showMapError() {
      mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:13px;color:#888;">지도를 불러오지 못했습니다</div>';
    }

    function relayoutMap() {
      if (!kakaoMapInstance || !kakaoMapCenter) return;
      kakaoMapInstance.relayout();
      kakaoMapInstance.setCenter(kakaoMapCenter);
    }

    function renderMap() {
      if (!window.kakao || !kakao.maps || !kakao.maps.services) return false;

      const mapOption = {
        center: new kakao.maps.LatLng(37.266, 127.0),
        level: 3
      };

      kakaoMapInstance = new kakao.maps.Map(mapEl, mapOption);
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status !== kakao.maps.services.Status.OK || !result || !result.length) {
          showMapError();
          return;
        }

        kakaoMapCenter = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: kakaoMapInstance,
          position: kakaoMapCenter
        });

        const infoWindow = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:7px 10px;font-size:12px;line-height:1.4;text-align:center;white-space:nowrap;">
              ${venueName}
            </div>
          `
        });

        infoWindow.open(kakaoMapInstance, marker);
        relayoutMap();

        setTimeout(relayoutMap, 200);
        setTimeout(relayoutMap, 800);
      });

      window.addEventListener('resize', relayoutMap);
      window.addEventListener('load', relayoutMap);
      return true;
    }

    if (renderMap()) return;

    let retryCount = 0;
    const retryTimer = setInterval(() => {
      retryCount += 1;
      if (renderMap() || retryCount >= 20) {
        clearInterval(retryTimer);
      }
    }, 250);
  }
  /* ═══════════════════════════════════════════
     Account Section (축의금)
     ═══════════════════════════════════════════ */

  function renderAccounts(accounts, containerId) {
    const container = $(`#${containerId}`);
    accounts.forEach((acc) => {
      const item = document.createElement('div');
      item.className = 'account-item';
      const accountStr = `${acc.bank} ${acc.number}`;
      item.innerHTML = `
        <p class="account-role">${acc.role}</p>
        <p class="account-info">${accountStr}</p>
        <button class="copy-btn" data-account="${accountStr}">복사</button>
      `;
      container.appendChild(item);
    });
  }

  function initAccounts() {
    renderAccounts(CONFIG.accounts.groom, 'groomAccountList');
    renderAccounts(CONFIG.accounts.bride, 'brideAccountList');

    // Accordion toggles
    $$('.accordion-header').forEach((header) => {
      header.addEventListener('click', () => {
        const accordion = header.parentElement;
        accordion.classList.toggle('active');
      });
    });

    // Copy account delegates
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.account-item .copy-btn');
      if (!btn) return;
      const text = btn.dataset.account;
      copyToClipboard(text, '계좌번호가 복사되었습니다');
    });
  }

  /* ═══════════════════════════════════════════
     Footer
     ═══════════════════════════════════════════ */

  function initFooter() {
    const dt = getWeddingDateTime();
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    $('#footerText').textContent = `${CONFIG.groom.name} & ${CONFIG.bride.name} — ${year}.${month}.${day}`;
  }

  /* ═══════════════════════════════════════════
     Loading Placeholders
     ═══════════════════════════════════════════ */

  function showLoadingPlaceholders() {
    const placeholderHTML = '<div class="loading-placeholder"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span></div>';

    const storyPhotos = $('#storyPhotos');
    const galleryGrid = $('#galleryGrid');

    if (storyPhotos) storyPhotos.innerHTML = placeholderHTML;
    if (galleryGrid) galleryGrid.innerHTML = placeholderHTML;
  }

  /* ═══════════════════════════════════════════
     Scroll Animations (IntersectionObserver)
     ═══════════════════════════════════════════ */

  let scrollObserver = null;

  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add animation classes to static elements
    const storyText = $('.story-text');
    const galleryTitle = $('.gallery-title');
    const gallerySubtitle = $('.gallery-subtitle');
    const locationTitle = $('.location-title');
    const locationInfo = $('.location-info');
    const locationMap = $('.location-map-container');
    const accountTitle = $('.account-title');
    const accountSubtitle = $('.account-subtitle');

    if (storyText) storyText.classList.add('fade-in-right');
    if (galleryTitle) galleryTitle.classList.add('fade-in');
    if (gallerySubtitle) gallerySubtitle.classList.add('fade-in');
    if (locationTitle) locationTitle.classList.add('fade-in');
    if (locationInfo) locationInfo.classList.add('fade-in');
    if (locationMap) locationMap.classList.add('scale-in');
    if (accountTitle) accountTitle.classList.add('fade-in');
    if (accountSubtitle) accountSubtitle.classList.add('fade-in');

    // Observe all animated elements
    $$('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      scrollObserver.observe(el);
    });
  }

  function observeNewElements() {
    if (!scrollObserver) return;
    $$('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      if (!el.classList.contains('visible')) {
        scrollObserver.observe(el);
      }
    });
  }

  /* ═══════════════════════════════════════════
     contact buttons
     ═══════════════════════════════════════════ */

function initContactModal() {
  const modal = document.getElementById('contactModal');
  const openBtn = document.getElementById('openContactModal');
  const closeBtn = document.getElementById('contactClose');
  const overlay = document.getElementById('contactOverlay');
  const list = document.getElementById('contactList');

  const contacts = CONFIG.contacts;

  function createItem(data) {
    const div = document.createElement('div');
    div.className = 'contact-item';

    const phone = (data.phone || '').replace(/[^0-9]/g, '');

    div.innerHTML = `
      <div class="contact-name">${data.name}</div>
      <div class="contact-actions">
        <a href="tel:${phone}" class="contact-btn" aria-label="${data.name}에게 전화하기">📞</a>
      </div>
    `;
    return div;
  }

  const orderedContacts = [
    contacts.groomFather,
    contacts.groomMother,
    contacts.brideFather,
    contacts.brideMother,
    contacts.groom,
    contacts.bride
  ].filter(Boolean);

  list.innerHTML = '';
  orderedContacts.forEach((contact) => {
    list.appendChild(createItem(contact));
  });

  // 열기
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  });

  // 닫기
  function close() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
}

  function initBGM() {
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('musicToggle');
  const icon = btn ? btn.querySelector('.music-icon') : null;

  if (!audio || !btn || !icon) return;

  function setButtonState() {
    const playing = !audio.paused && !audio.ended;

    btn.classList.toggle('playing', playing);
    btn.classList.toggle('off', !playing);
    btn.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');

    /* 아이콘은 항상 동일 유지 (CSS로 사선 처리) */
    icon.textContent = '♫';
  }

  function tryPlay() {
    audio.play()
      .then(() => {
        setButtonState();
      })
      .catch(() => {
        setButtonState();
        document.addEventListener('click', resumeOnce, { once: true });
      });
  }

  function resumeOnce() {
    audio.play().finally(setButtonState);
  }

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().finally(setButtonState);
    } else {
      audio.pause();
      setButtonState();
    }
  });

  audio.addEventListener('play', setButtonState);
  audio.addEventListener('pause', setButtonState);
  audio.addEventListener('ended', setButtonState);

  setButtonState();
  tryPlay();
}
/* ═══════════════════════════════════════════
     Init
     ═══════════════════════════════════════════ */

  async function init() {
    setMetaTags();
    initCurtain();
    initHero();
    initCountdown();
    initCalendar();

    // Show loading placeholders while detecting images
    showLoadingPlaceholders();

    // Init sections that don't depend on image detection
    initPhotoViewer();
    initLocation();
    initKakaoMap();
    initAccounts();
    initFooter();
    initScrollAnimations();

    // Start petal animation
    setTimeout(initPetals, 1500);

    // Auto-detect story and gallery images in parallel
    const storyImages = getImageList('story', CONFIG.imageCounts.story);
    const galleryImages = getImageList('gallery', CONFIG.imageCounts.gallery);

    // Render sections with discovered images
    initStory(storyImages);
    initGallery(galleryImages);
    //contact modal, BGM
    initContactModal();
    initBGM();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
