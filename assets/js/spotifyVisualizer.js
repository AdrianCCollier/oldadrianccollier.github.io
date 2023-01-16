console.log('yo')

var svg = d3.select(".audio-wave")
.attr("width", "100%")
.attr("height", "100%");

var rect = svg.append("rect")
.attr("x", 0)
.attr("y", 0)
.attr("width", "100%")
.attr("height", "100%")
.attr("fill", "black");

rect.attr("class", "audio-wave-rect");