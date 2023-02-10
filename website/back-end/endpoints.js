const axios = require('axios')

// derived from .env
const apiKey = process.env.NASA_API_KEY

// the feed endpoint is being targeted 
const feedURL = 'https://api.nasa.gov/neo/rest/v1/feed'

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

function getEndDate() {
  const today = new Date()
  const nextWeek = new Date(today.setDate(today.getDate() + 7))
  const dd = String(nextWeek.getDate()).padStart(2, '0')
  const mm = String(nextWeek.getMonth() + 1).padStart(2, '0')
  const yyyy = nextWeek.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

async function targetNearestAsteroids() {
  const startDate = getCurrentDate();
  const endDate = getEndDate();

  try {
    const response = await axios.get(
      `${feedURL}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    )
    return response.data;
  } catch (error) {
    return error
  }
}


targetNearestAsteroids();

module.exports = {
  targetNearestAsteroids,
}
