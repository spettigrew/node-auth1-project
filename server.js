express = require('express')
const helmet = require("helmet")
const cors = require("cors")

// import routers
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")


require('dotenv').config()

const server = express();
server.use(helmet())
server.use(cors())
server.use(express.json());

// import api endpoints, router files.
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong, check again.",
    })
})

module.exports = server;
