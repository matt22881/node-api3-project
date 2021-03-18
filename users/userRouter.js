const express = require('express');

const router = express.Router();

const Users = require('./userDb')
const Posts = require('./../posts/postDb')

const validateUser = require('./../middleware/validateUser')
const validateUserId = require('./../middleware/validateUserId')
const validatePost = require('./../middleware/validatePost')


router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = {
    user_id: req.params.id,
    text: req.body.text
  }
  Posts.insert(post)
    .then(resp => {
      console.log('resp: ', resp)
      res.status(200).json(resp)
    })
    .catch(err => {
      res.status(500).json({message:"Error adding post to the database.", error: err})
    })
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    });
})


router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json({message: 'user has been removed'})
  })
  .catch(err => {
    res.status(500).json({message:"There was an error removing the User", error: err})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(resp => {
      res.status(200).json({message:`${resp} User(s) Updated`})
    })
});

module.exports = router;
