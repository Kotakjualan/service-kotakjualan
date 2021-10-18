const polka = require('polka')
const json = require('../middleware/json')
const { middleRegister } = require('../middleware/rule')
const server = polka()

server.post("/register", json, middleRegister, (req, res)=>{
  
})

module.exports = server