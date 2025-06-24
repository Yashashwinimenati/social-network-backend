const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:postId/comments', (req, res, next) => {
  console.log('DEBUG: /posts/:postId/comments route hit');
  next();
}, auth, commentController.addComment);
router.get('/:postId/comments', commentController.getComments);

module.exports = router; 