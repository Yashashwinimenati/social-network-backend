const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const auth = require('../middleware/auth');

router.post('/:postId/react', auth, reactionController.react);
router.delete('/:postId/react', auth, reactionController.removeReaction);
router.get('/:postId/reactions', reactionController.getReactions);

module.exports = router; 