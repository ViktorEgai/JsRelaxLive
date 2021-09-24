'use sctrict';
const login = 'EgaiViktor',
  password = 'q1w2e3';

const form = document.querySelector('form'),
  username = document.getElementById('name'),
  pass = document.getElementById('type'),
  warning = document.querySelectorAll('.text-warning');

form.addEventListener('submit', () => {
  event.preventDefault();

  if (username.value !== login) {
    warning[0].style.display = 'block';
    username.value = '';
  } 
  if (pass.value !== password) {
    warning[1].style.display = 'block';
    pass.value = '';
  } 
  if(username.value === login && pass.value === password) {
    window.location.href = './table.html';
    document.cookie = `username=${username.value}`;
    document.cookie = `password=${pass.value}`;
  }  
})

