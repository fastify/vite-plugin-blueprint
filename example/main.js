import foobar from '@blueprint/foobar.js'

document.querySelector('#app').innerHTML = (
  '<h1>Hello from main.js!</h1>\n' +
  `<p>Here's the value of foobar: ${foobar}`
)
