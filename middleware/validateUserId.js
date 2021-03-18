const Users = require('./../users/userDb')

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
        .then(user => {
            if (!user) {
            res.status(400).json({ message: "invalid user id" })
            } else {
            req.user = user
            console.log(`Success! req.user set to ${user.name}`)
            next()
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error validating the id', error: err})
        })
}

module.exports = validateUserId