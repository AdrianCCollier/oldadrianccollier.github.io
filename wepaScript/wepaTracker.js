const axios = require('axios')
const cheerio = require('cheerio')
const audio = new Audio('wepaSound.mp3')

async function getData() {
  try {
    const response = await axios.get(
      'https://cs.wepanow.com/000nmsu146.html&filter='
    )
    const $ = cheerio.load(response.data)
    const wepaAlert = $('.round-notif.red p, .round-notif.yellow p')

    if (wepaAlert.length) {
      const printerCount = wepaAlert.text().trim()
      console.log('Printer count:', printerCount)
      audio.play()
      document.querySelector('#status-button').classList.remove('green')
      document.querySelector('#status-button').classList.add('red')
    } else {
      console.log(
        'Error: Could not find .round-notif.red p or .round-notif.yellow p element'
      )
      document.querySelector('#status-button').classList.remove('red')
      document.querySelector('#status-button').classList.add('green')
    }
  } catch (error) {
    console.error('Error while scraping data:', error)
  }
}

getData()
