console.log('js connected')
var svg = d3.select('.audio-wave').attr('width', '100%').attr('height', '100%')

var rect = svg
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', 'black')

rect.attr('class', 'audio-wave-rect')

// Spotify Web Playback SDK feature
window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    'BQBow8QJvveUvp_-3RzLGxxOht4kINfEDDDQMOXMFfAQQJAS_SqGok6QLTe9L2w7CbKgkEP3MmFCxgFbNLgQx0Hk49j8limjyLgsZZyo86fEAddXfHYsUPLOY5aC_Plp5-Gpp_oPgKIl6z7n2-15rdmYox3iY721MScv277W-m8j84pT8uU8TpWsgzSAK_wjmgkv0g'
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',

    getOAuthToken: (cb) => {
      cb(token)
    },

    volume: 0.6,
  })

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id)
  })

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id)
  })

  // Listeners in case something happens during SDK initialization
  player.addListener('initialization_error', ({ message }) => {
    console.log(message)
  })

  player.addListener('authentication_error', ({ message }) => {
    console.log(message)
  })

  player.addListener('account_error', ({ message }) => {
    console.log(message)
  })

  document.getElementById('togglePlay').onclick = function () {
    player.togglePlay()
  }
  player.connect()
}

// Connect buttons to JS via ID with DOM
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', function (event) {
  event.preventDefault()
  const query = searchInput.value
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
})
