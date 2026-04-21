// Hardcoded list of JSON files for albums
const albumJsonFiles = [
  '/photography/sam-and-divina-wedding.json',
  '/photography/golden-triangle.json',
  '/photography/old-trafford.json',
  '/photography/sunset-park.json',
  '/photography/movement-junkies.json',
  '/photography/kew-gardens.json'
];

async function fetchAlbumJson(jsonPath) {
  const resp = await fetch(jsonPath);
  if (!resp.ok) return null;
  const data = await resp.json();
  return {
    name: data.title,
    subtitle: data.subtitle || '',
    date: data.date || '',
    cover: `/photography/thumbnails/${data.folder}/${data.photos[0]}`,
    path: `/photography/album.html#${jsonPath}`
  };
}

async function renderAlbums() {
  const grid = document.getElementById('album-grid');
  grid.innerHTML = '';
  const albumObjs = await Promise.all(albumJsonFiles.map(fetchAlbumJson));
  const validAlbums = albumObjs
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (validAlbums.length === 0) {
    grid.innerHTML = '<p>No albums found. Please add albums to /photography.</p>';
    return;
  }
  validAlbums.forEach(album => {
    const div = document.createElement('div');
    div.className = 'album-item';
    div.onclick = () => { window.location.href = album.path; };
    div.innerHTML = `
      <img class="album-cover" src="${album.cover}" alt="${album.name}">
      <div class="album-title">${album.name}</div>
      ${album.subtitle ? `<div class="album-subtitle">${album.subtitle}</div>` : ''}
    `;
    grid.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', renderAlbums);
