// global array to store neo data and make its scope available to all functions. Used to pass fetch promise from the back end to front end with drawMap()
let globalNeoData = []

// This function is used to clear the canvas, this is necessary when interacting with the slider in order to remove old asteroids and their orbital lines.
function clearCanvas() {
  const canvas = document.getElementById('neoMap');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
} // end clearCanvas

// front-end main function, it can be broken down into these features:
// - draw the sun on the canvas
// - draw earth on on the canvas
// - 
function drawMap(neoData) {
  globalNeoData = neoData
  clearCanvas();

  const apiKey = 'CBQjMERq2te14gAxcxr28G49RjlyUPjGq37Fwker'
  const canvas = document.getElementById('neoMap')
  const ctx = canvas.getContext('2d')
  const sunRadius = 40
  const neoRadius = 3
  const maxDistance = 200 // Maximum distance of the NEOs from the Sun
  const orbitOffset = 10 // Offset to add to the radius of each orbit
  const scaleFactor = 2.3
  const centerOffsetX = (canvas.width - 800 * scaleFactor) / 2 // Calculate the horizontal offset to center the map
  const centerOffsetY = (canvas.height - 600 * scaleFactor) / 2 // Calculate the vertical offset to center the map

  // traverse our neoData array to extract data into a variable called neo and multiply it by 2pi to make neos appear in random places throughout their orbit.  
  for (let i = 0; i < neoData.length; i++) {
    const neo = neoData[i]
    neo.randomAngle = Math.random() * 2 * Math.PI //generate random angle
  }

  // Here I'm drawing the sun by using the context methods of the Canvas API. Creating a circle and coloring it yellow. It can be resized with the variables.
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

  // Here I'm drawing earth in a similar way.
  const earthRadius = 6;
  const earthX = 475 * scaleFactor + centerOffsetX
  const earthY = 300 * scaleFactor + centerOffsetY

  ctx.fillStyle = 'blue'
  ctx.beginPath()
  ctx.arc(earthX, earthY, earthRadius * scaleFactor, 0, 2 * Math.PI)
  ctx.fill()

  // Here I'm drawing the orbital lines of the neos. This is done by traversing our neoData array and extracting the data. 
  ctx.strokeStyle = 'grey'
  ctx.lineWidth = 1
  for (let i = 0; i < neoData.length; i++) {
    const neo = neoData[i];
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
  } // end for loop

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
        (a * a * Math.sin(neo.randomAngle) * Math.sin(neo.randomAngle) +
          b * b * Math.cos(neo.randomAngle) * Math.cos(neo.randomAngle))
    ) // Calculate the radius of the NEO's position on the elliptical orbit
    ctx.beginPath()
    ctx.arc(
      400 * scaleFactor + radius * Math.cos(neo.randomAngle) + centerOffsetX, // Use the angle and radius of the orbit to calculate the position of the NEO
      300 * scaleFactor + radius * Math.sin(neo.randomAngle) + centerOffsetY,
      neoRadius * scaleFactor,
      0,
      2 * Math.PI
    )
    ctx.fill()
  } // end for loop

  // Highlight NEO with mouse interaction feature
  canvas.addEventListener('mousemove', (event) => {
    // Get the position and size of the canvas element
    const rect = canvas.getBoundingClientRect()
    // Get the position of the mouse click relative to the canvas
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Loop through the NEO data and check if the mouse click position is inside the path of any of the NEOs
    for (let i = 0; i < neoData.length; i++) {
      const neo = neoData[i]
      const a =
        Math.min(sunRadius + orbitOffset * i + neo.distance, maxDistance) *
        scaleFactor // Major axis
      const b = a * 0.6 // Minor axis
      const radius = Math.sqrt(
        (a * a * b * b) /
          (a * a * Math.sin(neo.randomAngle) * Math.sin(neo.randomAngle) +
            b * b * Math.cos(neo.randomAngle) * Math.cos(neo.randomAngle))
      ) // Calculate the radius of the NEO's position on the elliptical orbit

      // Calculate the position of the NEO
      const neoX =
        400 * scaleFactor + radius * Math.cos(neo.randomAngle) + centerOffsetX
      const neoY =
        300 * scaleFactor + radius * Math.sin(neo.randomAngle) + centerOffsetY

      ctx.beginPath()
      ctx.arc(neoX, neoY, neoRadius * scaleFactor, 0, 2 * Math.PI)
      if (ctx.isPointInPath(x, y)) {
        console.log('Mouse hovering over NEO...')
        ctx.fillStyle = 'red'
        ctx.fill()
      } // end if
      else {
        // If the mouse is not hovering over the NEO, reset its fill style and redraw it
        ctx.fillStyle = 'white'
        ctx.fill()
      }
    } // end for loop
  })

  // Click NEO and request endpoint feature
  canvas.addEventListener('click', async (event) => {
    clearCanvas();
    // Get the position and size of the canvas element
    const rect = canvas.getBoundingClientRect()
    // Get the position of the mouse click relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Loop through the NEO data and check if the mouse click position is inside the path of any of the NEOs
    for (let i = 0; i < neoData.length; i++) {
      const neo = neoData[i]
      const a =
        Math.min(sunRadius + orbitOffset * i + neo.distance, maxDistance) *
        scaleFactor // Major axis
      const b = a * 0.6 // Minor axis
      const radius = Math.sqrt(
        (a * a * b * b) /
          (a * a * Math.sin(neo.randomAngle) * Math.sin(neo.randomAngle) +
            b * b * Math.cos(neo.randomAngle) * Math.cos(neo.randomAngle))
      ) // Calculate the radius of the NEO's position on the elliptical orbit
      ctx.beginPath()
      ctx.arc(
        400 * scaleFactor + radius * Math.cos(neo.randomAngle) + centerOffsetX, // Use the angle and radius of the orbit to calculate the position of the NEO
        300 * scaleFactor + radius * Math.sin(neo.randomAngle) + centerOffsetY,
        neoRadius * scaleFactor,
        0,
        2 * Math.PI
      )
      if (ctx.isPointInPath(x, y)) {
        // If the mouse click is inside the path of the NEO, make the fetch request to get more information about it
        console.log('NEO Clicked')
        displayNEOInfo(neo.referenceId) // Call the function with the referenceId of the clicked NEO
      } // end if
    } // end for
  }) // end event listener

  // Function to make the fetch request to the API and display the information about the NEO

  // Given an API key and referenceID endpoint, we can get more information about a neo. We extract the info and store them into variables for future use
  async function displayNEOInfo(referenceId) {
    // fetch API credentials
    const apiKey = 'CBQjMERq2te14gAxcxr28G49RjlyUPjGq37Fwker'
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${referenceId}?api_key=${apiKey}`

    // attempt fetch
    try {
      const response = await fetch(url)
      const data = await response.json()

      // extract data from API call
      const asteroidId = data.id
      const asteroidName = data.name
      const neoSize = data.estimated_diameter.meters.estimated_diameter_min
      const neoDanger = data.is_potentially_hazardous_asteroid

      // update table cells with extracted data
      document.getElementById('neo-id').textContent = asteroidId
      document.getElementById('neo-name').textContent = asteroidName
      document.getElementById('neo-size').textContent = neoSize
      document.getElementById('neo-danger').textContent = neoDanger
    } catch (error) {
      console.error(error)
      return {}
    } // end catch
  } // end displayNEOInfo function
} // end drawMap function

function placeholder2() {
  console.log('placeholder')
}

// this function acts as the back-end component which makes requests to NASA's API endpoints with the API key provided by them. Specifically, we are receiving our JSON response and storing it into a data variable which is then converted into an array list of the nearest neos
async function getNEOs(limit) {
  const apiKey = 'CBQjMERq2te14gAxcxr28G49RjlyUPjGq37Fwker'
  const endPoint = 'https://api.nasa.gov/neo/rest/v1/neo/browse'
  const url = `${endPoint}?api_key=${apiKey}&limit=${limit}`

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Transform the data into a format that can be used by the drawMap function
    const neoData = data.near_earth_objects.map((neo) => ({
      distance: neo.close_approach_data[0].miss_distance.kilometers / 1e6,
      angle: Math.atan2(
        neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        neo.close_approach_data[0].miss_distance.kilometers
      ),
      referenceId: neo.id,
    }))

    return neoData.slice(0, limit) // Return only the first `limit` elements of the `neoData` array
  } catch (error) {
    console.error(error)
    return [] // Return an empty array if an error occurs
  }
}

function drawSlider(limit) {
  const neoRange = document.getElementById('neoRange')
  const neoCount = document.getElementById('neoCount')

  neoRange.addEventListener('change', async () => {
    neoCount.textContent = neoRange.value
    limit = neoRange.value // Update the value of the limit variable

    const neoData = await getNEOs(limit);

    drawMap(neoData, limit);
  })
} // end drawSlider

function placeholder() {
  console.log('placeholder')
}

async function main() {
  let limit = 4

  const neoData = await getNEOs(limit)
  drawMap(neoData, limit)
  drawSlider(limit)
}

main();

