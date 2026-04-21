// Example: photos = [ { src: '/albums/summer2024/1.jpg', alt: 'Photo 1' }, ... ]
// const photos = [];

// TODO: Replace with dynamic fetching if backend or album folder listing is available
// For now, manually populate photos array or fetch from a JSON endpoint if available

// Parse ?album=... from URL
function getAlbumPath() {
  return window.location.hash.slice(1) || null;
}

async function fetchAlbumData() {
  const albumJson = getAlbumPath();
  if (!albumJson) return null;
  const resp = await fetch(albumJson);
  if (!resp.ok) return null;
  return await resp.json();
}

async function renderPhotos() {
  const grid = document.getElementById('photo-grid');
  const titleEl = document.getElementById('album-title');
  grid.innerHTML = '';
  const data = await fetchAlbumData();
  if (!data) {
    grid.innerHTML = '<p>Album not found.</p>';
    return;
  }
  titleEl.textContent = data.title;
  if (!data.photos || data.photos.length === 0) {
    grid.innerHTML = '<p>No photos found in this album.</p>';
    return;
  }
  const folder = data.folder || albumJsonName();
  data.photos.forEach(filename => {
    const src = `/photography/${folder}/${filename}`;
    const div = document.createElement('div');
    div.className = 'album-item';
    div.innerHTML = `<img class="photo-thumb" src="${src}" alt="${filename}">`;
    div.onclick = () => openLightbox(src, filename);
    grid.appendChild(div);
  });
}

function albumJsonName() {
  const albumJson = getAlbumPath();
  if (!albumJson) return '';
  return albumJson.split('/').pop().replace('.json','');
}

function openLightbox(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  img.alt = alt;
  lightbox.style.display = 'flex';
}

document.getElementById('lightbox-close').onclick = function() {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightbox-img').src = '';
};

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display !== 'none') {
      lightbox.style.display = 'none';
      document.getElementById('lightbox-img').src = '';
    }
  }
});

document.addEventListener('DOMContentLoaded', renderPhotos);
