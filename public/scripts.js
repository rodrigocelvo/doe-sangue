const button = document.querySelector('#btn-header');
const form = document.querySelector('.form');

button.addEventListener("click", () => {
  form.classList.toggle('hide');
});
