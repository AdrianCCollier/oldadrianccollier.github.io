const sayHi = (name) => {
  console.log(`hello there ${name}`)
}

module.exports = sayHi


// Modules - Encapsulated code
const names = require('./names')
const sayHi = require('./utils')
const data = require('./alternative-flavor')
console.log(data);
sayHi('susan');
sayHi(names.john)
sayHi(names.peter)
