const express = require('express');

const server = express();
server.use(express.json())

const userRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')

const logger = require('./middleware/logger')
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postsRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

module.exports = server;
