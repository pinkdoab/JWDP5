const button = document.querySelector('button');

button.addEventListener('click', event => {
    console.log('rrrrr')
  button.innerHTML = `Click count: ${event.detail}`
})