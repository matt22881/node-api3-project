// code away!
require('dotenv').config()
const server = require('./server')

const port =process.env.PORT || 5555

server.listen(port, () => console.log(`API Server listening on port ${port}!`))