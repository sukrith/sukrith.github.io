document.addEventListener('DOMContentLoaded', function () {
  const footer = document.createElement('div');
  footer.className = 'footer-text';
  footer.innerHTML = `
    <p class="left-footer">akula@sukrith.com</p>
    <p class="right-footer">NYC</p>
  `;
  document.body.appendChild(footer);
});
