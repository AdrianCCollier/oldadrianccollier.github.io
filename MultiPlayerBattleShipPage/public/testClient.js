document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  socket.on('connect', () => {
    console.log('Client-side: User connected: ' + socket.id)
  })

  socket.on('hello', (message) => {
    console.log('Client-side: Received hello message:', message)
  })

  const helloButton = document.getElementById('hello-button')
  helloButton.addEventListener('click', () => {
    socket.emit('sayHello')
  })
})
