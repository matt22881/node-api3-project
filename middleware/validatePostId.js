const Posts = require('./../posts/postDb')

function validatePostId(req, res, next) {
    Posts.getById(req.params.id)
        .then(post => {
            if (!post) {
            res.status(400).json({ message: "invalid post id" })
            } else {
            req.post = post
            next()
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error validating the post', error: err})
        })
}

module.exports = validatePostId