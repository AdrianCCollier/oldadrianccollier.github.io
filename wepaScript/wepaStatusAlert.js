const wepaAlert = document.querySelector(
  '.round-notif.red p, .round-notif.yellow p'
)
const wepaSound = new Audio('wepaSound.mp3')

if (wepaAlert) {
  wepaAlert.addEventListener('DOMSubtreeModified', () => {
    const printerCount = wepaAlert.textContent

    if (printerCount > 0) {
      wepaSound.play()
    }
  })
} else {
  console.log(
    'Error: could not find .round-notif.red p or .round-notif.yellow p element'
  )
}

wepaSound.addEventListener('error', (e) => {
  console.error('Error: Failed to load audio file', e)
})
