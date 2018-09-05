const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Post = require('../../models/Post');
// Load user model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: "Posts Works"
}));

// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', 
  (req, res) => {
    Post
    .find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
);


// @route GET api/posts/:id
// @desc Get posts
// @access Public
router.get('/:id', 
  (req, res) => {
    Post
    .findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No post found with that ID"}));
  }
);


// @route POST api/posts
// @desc Create Post
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      res.status(400).json(errors);
    }
    

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post))
  });

// @route DELETE api/posts/:id
// @desc Delete Post
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      Post
      .findById(req.params.id)
      .then(post => {
        // Authorize that user is the owner of post
        if (profile.user.toString() !== post.user.toString()) {
          return res.status(401).json({ notauthorized: 'User not authorized' })
        }

        post
        .remove()
        .then(msg => res.json({ success: true }))
        .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json({ msg: "No post found" }));
    });
  }
);

// @route POST api/posts/like/:id
// @desc Like Post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      Post
      .findById(req.params.id)
      .then(post => {
        let userAlreadyLiked = post.likes.filter(like => like.user.toString() === profile.user.toString()).length > 0;
        if (userAlreadyLiked) {
          return res.status(400).json({ alreadyliked: 'User already liked this post' });
        }
        post.likes.push({ user: profile.user });
        post.save().then(() => res.json(post));
      })
      .catch(err => res.status(404).json({ msg: "No post found" }));
    });
  }
);

// @route DELETE api/posts/like/:id
// @desc Like Post
// @access Private
router.delete('/like/:id', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      Post
      .findById(req.params.id)
      .then(post => {
        let userHasNotLiked = post.likes.filter(like => like.user.toString() === profile.user.toString()).length === 0;
        if (userHasNotLiked) {
          return res.status(404).json({ neverliked: 'User never liked this post' });
        }
        post.likes = post.likes.filter(like => like.user.toString() !== profile.user.toString() );
        post.save().then(() => res.json(post));
      })
      .catch(err => res.status(404).json({ msg: "No post found" }));
    });
  }
);

// @route POST api/posts/comment/:id
// @desc Make a comment
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      res.status(400).json(errors);
    }

    Post
    .findById(req.params.id)
    .then(post => {
      const comment = {
        user: req.user.id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
      }
      post.comments.push(comment);
      post.save().then(() => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      Post
      .findById(req.params.id)
      .then(post => {
        const commentToDelete = post.comments.filter(comment => comment._id.toString() === req.params.comment_id)[0];
        if (!commentToDelete) {
          return res.status(404).json({ commentnotexist: 'Comment was not found' })
        } 
        // Authorize that user is the owner of comment
        if (profile.user.toString() !== commentToDelete.user.toString()) {
          return res.status(401).json({ notauthorized: 'User not authorized' })
        }
        const indexOfCommentToDelete = post.comments.indexOf(commentToDelete);
        post.comments.splice(indexOfCommentToDelete, 1);
        post.save().then(() => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'The post does not exist' }));
    });
  }
);

module.exports = router;
