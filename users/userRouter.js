const express = require('express');

const router = express.Router();

const Users = require('./userDb')

const validateUser = require('./../middleware/validateUser')
const validateUserId = require('./../middleware/validateUserId')
const validatePost = require('./../middleware/validatePost')


router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  next()
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
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(resp => {
      res.status(200).json({message:`${resp} User(s) Updated`})
    })
});

module.exports = router;
