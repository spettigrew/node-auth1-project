express = require('express')

// import routers
const userRouter = require('./users/user-router')

require('dotenv').config()

const server = express();

server.use(express.json());

// import api endpoints, router files.
server.use('/api/users', userRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong, check again.",
    })
})

module.exports = server;
