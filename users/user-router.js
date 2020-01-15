const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("./user.model")

const router = express.Router()


function restricted() {
    const authError = {
        message: "Invalid credentials."
    }

    return async (req, res, next) => {
        try {
            const { username, password } = req.headers
            if (!username || !password) { //!null (or||) undefined falsey.
                return res.status(401).json(authError)
            }

            const user = await userModel.findBy({ username })
            .first()
            if (!user) {
                return res.status(401).json(authError)
            }

            const passwordValid = await bcrypt.compare(password, user.password)// plain string vs. hash.
            if (!passwordValid) {
                return res.status(401).json(authError)
            }

            next()
        } catch (err) {
            next(err) //next() with error parameter
        }
    }
} 
// creates an authenticated, protected endpoint.
router.get("/", restricted(), async (req, res, next) => {//.get a list of users,all restricted from prior function have to pass this endpoint.
    try {
        const users = await userModel.find()

        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})

module.exports = router