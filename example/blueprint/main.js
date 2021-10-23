import foobar from '@blueprint/foobar'

document.querySelector('#app').innerHTML = (
  '<h1>Hello from blueprint/main.js!</h1>\n' +
  `<p>Here's the value of foobar: ${foobar}`
)
