document.addEventListener('DOMContentLoaded', () => {
  const socket = io()

  socket.on('connect', () => {
    console.log('Client-side: User connected: '  + socket.id);
    socket.emit('joinGame');
  });

  socket.on('updatedGameState', (game) => {
    console.log('Client-side: Received updated game')
  })

  socket.on('joinGameResponse', (message) => {
    console.log('Client-side: Received joinGameResponse message:', message)
  });

  const helloButton = document.getElementById('start-button')
  helloButton.addEventListener('click', () => {
    socket.emit('joinGame')
  })
})
