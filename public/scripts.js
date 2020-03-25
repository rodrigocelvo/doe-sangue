const button = document.querySelector('#btn-header');
const form = document.querySelector('.form');

button.addEventListener("click", () => {
  form.classList.toggle('hide');
});

// NIGHT MODE \\

const nightModeStorage = localStorage.getItem('NightMode')
const nightMode = document.querySelector('#night-mode')

if (nightModeStorage) {
  document.documentElement.classList.add('night-mode')
  nightMode.checked = true
}

nightMode.addEventListener('click', () => {
  document.documentElement.classList.toggle('night-mode')
  
  if (document.documentElement.classList.contains('night-mode')) {
    localStorage.setItem('NightMode', true)
    return
  }
  localStorage.removeItem('NightMode')
});