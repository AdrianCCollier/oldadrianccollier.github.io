function drawMap(neoData) {
  const canvas = document.getElementById('neoMap')
  const ctx = canvas.getContext('2d')
  const sunRadius = 40
  const neoRadius = 3
  const maxDistance = 200 // Maximum distance of the NEOs from the Sun
  const orbitOffset = 10 // Offset to add to the radius of each orbit
  const neoOffset = 15 // Offset to add to the positions of the NEOs
  const scaleFactor = 2.3
  const centerOffsetX = (canvas.width - 800 * scaleFactor) / 2 // Calculate the horizontal offset to center the map
  const centerOffsetY = (canvas.height - 600 * scaleFactor) / 2 // Calculate the vertical offset to center the map

  // Draw the Sun
  ctx.fillStyle = 'yellow'
  ctx.beginPath()
  ctx.arc(
    400 * scaleFactor + centerOffsetX,
    300 * scaleFactor + centerOffsetY,
    sunRadius * scaleFactor,
    0,
    2 * Math.PI
  )
  ctx.fill()

  // Draw the orbits of the NEOs
  ctx.strokeStyle = 'grey'
  ctx.lineWidth = 1
  for (let i = 0; i < neoData.length; i++) {
    const neo = neoData[i]
    const a =
      Math.min(sunRadius + orbitOffset * i + neo.distance, maxDistance) *
      scaleFactor // Major axis
    const b = a * 0.6 // Minor axis
    ctx.beginPath()
    ctx.ellipse(
      400 * scaleFactor + centerOffsetX,
      300 * scaleFactor + centerOffsetY,
      a,
      b,
      0,
      0,
      2 * Math.PI
    ) // Draw the elliptical orbit line centered at (400, 300)
    ctx.stroke()
  }

  // Draw the NEOs
  ctx.fillStyle = 'white'
  for (let i = 0; i < neoData.length; i++) {
    const neo = neoData[i]
    const a =
      Math.min(sunRadius + orbitOffset * i + neo.distance, maxDistance) *
      scaleFactor // Major axis
    const b = a * 0.6 // Minor axis
    const radius = Math.sqrt(
      (a * a * b * b) /
        (a * a * Math.sin(neo.angle) * Math.sin(neo.angle) +
          b * b * Math.cos(neo.angle) * Math.cos(neo.angle))
    ) // Calculate the radius of the NEO's position on the elliptical orbit
    ctx.beginPath()
    ctx.arc(
      400 * scaleFactor + radius * Math.cos(neo.angle) + centerOffsetX, // Use the angle and radius of the orbit to calculate the position of the NEO
      300 * scaleFactor + radius * Math.sin(neo.angle) + centerOffsetY,
      neoRadius * scaleFactor,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }

  // Draw the label for each NEO
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  for (let i = 0; i < neoData.length; i++) {
    const neo = neoData[i]
    const a =
      Math.min(sunRadius + orbitOffset * i + neo.distance, maxDistance) *
      scaleFactor // Major axis
    const b = a * 0.6 // Minor axis
    const radius = Math.sqrt(
      (a * a * b * b) /
        (a * a * Math.sin(neo.angle) * Math.sin(neo.angle) +
          b * b * Math.cos(neo.angle) * Math.cos(neo.angle))
    ) // Calculate the radius of the NEO's position on the elliptical orbit
    ctx.fillText(
      neo.name, // Use the "name" property of the NEO object to draw the label
      400 * scaleFactor + radius * Math.cos(neo.angle) + centerOffsetX, // Use the angle and radius of the orbit to calculate the position of the label
      300 * scaleFactor +
        radius * Math.sin(neo.angle) +
        centerOffsetY +
        neoRadius * scaleFactor +
        5 // Add the radius of the NEO and an offset to position the label above the NEO
    )
  }

  // Draw Earth
  const earth = neoData.find((neo) => neo.name === 'Earth')
  if (earth) {
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(
      400 * scaleFactor +
        Math.min(sunRadius + earth.distance, maxDistance) *
          Math.cos(earth.angle),
      300 * scaleFactor +
        Math.min(sunRadius + earth.distance, maxDistance) *
          Math.sin(earth.angle), // Clamp the distance of the Earth to the maximum distance
      neoRadius * scaleFactor,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }
}

async function getNEOs(limit) {
  const apiKey = 'CBQjMERq2te14gAxcxr28G49RjlyUPjGq37Fwker'
  const endPoint = 'https://api.nasa.gov/neo/rest/v1/neo/browse'
  const url = `${endPoint}?api_key=${apiKey}&limit=${limit}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    // Transform the data into a format that can be used by the drawMap function
    const neoData = data.near_earth_objects.map((neo) => ({
      distance: neo.close_approach_data[0].miss_distance.kilometers / 1e6,
      angle: Math.atan2(
        neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        neo.close_approach_data[0].miss_distance.kilometers
      ),
    }))

    return neoData.slice(0, limit) // Return only the first `limit` elements of the `neoData` array
  } catch (error) {
    console.error(error)
    return [] // Return an empty array if an error occurs
  }
}

async function main() {
  const limit = 10
  const neoData = await getNEOs(limit)
  drawMap(neoData, limit)
}

main()
