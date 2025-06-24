const Comment = require('../models/comment');
const User = require('../models/user');

// Placeholder: add comment, get comments
exports.addComment = async (req, res) => {
  try {
    const { content, parentCommentId, mentions } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Content is required.' });
    }
    const comment = await Comment.create({
      content,
      parentCommentId,
      mentions,
      postId,
      userId
    });
    const author = await User.findByPk(userId);
    res.status(201).json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        author: {
          id: author.id,
          name: `${author.firstName} ${author.lastName}`,
          profilePicture: author.profilePicture
        },
        createdAt: comment.createdAt,
        reactions: {},
        replyCount: 0,
        replies: []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { postId, parentCommentId: null },
      include: [
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'profilePicture'] },
        { model: Comment, as: 'replies', include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'profilePicture'] }] }
      ],
      order: [['createdAt', 'ASC']]
    });
    res.json({
      success: true,
      comments: comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.author.id,
          name: `${comment.author.firstName} ${comment.author.lastName}`,
          profilePicture: comment.author.profilePicture
        },
        createdAt: comment.createdAt,
        reactions: {},
        replyCount: comment.replies.length,
        replies: comment.replies.map(reply => ({
          id: reply.id,
          content: reply.content,
          author: {
            id: reply.author.id,
            name: `${reply.author.firstName} ${reply.author.lastName}`,
            profilePicture: reply.author.profilePicture
          },
          createdAt: reply.createdAt,
          reactions: {}
        }))
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}; 