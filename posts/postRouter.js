const express = require('express')
const router = express.Router()

const Posts = require('./postDb')

const validatePostId = require('./../middleware/validatePostId')
const validatePost = require('./../middleware/validatePost')


router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then(res => {
    res.status(200).json({message: 'post has been removed'})
  })
  .catch(err => {
    res.status(500).json({message:"There was an error removing the post", error: err})
  })
});


router.put('/:id', validatePostId, validatePost, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(resp => {
      res.status(200).json({message:`${resp} Post(s) Updated`})
    })
});

module.exports = router;
