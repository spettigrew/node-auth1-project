const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("../users/user.model")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const savedUser = await userModel.add(req.body)
        return res.status(201).json(savedUser)
    }catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findBy({ username })
        .first()
        // 'salts' password before it is hashed.
        const passwordValid = await bcrypt.compare(password, user.password) //validates hash to the password. Compares password to time complexity. Returns a boolean.
        if (user && passwordValid) { 

           return res.status(200).json({ message: `Welcome, ${user.username}!`, })
        } else {
           return res.status(401).json({ message: "Invalid credentials.", })
        }
    }   catch (err) {
        next(err)
    }
})

module.exports = router