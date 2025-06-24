const Post = require('../models/post');
const User = require('../models/user');

// Placeholder: create post, get feed, get post details, update, delete
exports.createPost = async (req, res, next) => {
  try {
    const { content, media, privacy, location, feeling, type } = req.body;
    const userId = req.user.id;
    const post = await Post.create({
      content,
      media,
      privacy,
      location,
      feeling,
      type,
      userId
    });
    const author = await User.findByPk(userId);
    res.status(201).json({
      success: true,
      post: {
        id: post.id,
        content: post.content,
        author: {
          id: author.id,
          name: `${author.firstName} ${author.lastName}`,
          profilePicture: author.profilePicture
        },
        createdAt: post.createdAt,
        privacy: post.privacy,
        reactions: { like: 0, love: 0, total: 0 },
        commentCount: 0,
        shareCount: 0
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName', 'profilePicture']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json({
      success: true,
      posts: posts.map(post => ({
        id: post.id,
        type: post.type,
        content: post.content,
        author: post.author ? {
          id: post.author.id,
          name: `${post.author.firstName} ${post.author.lastName}`,
          profilePicture: post.author.profilePicture
        } : null,
        createdAt: post.createdAt,
        reactions: { like: 0, love: 0, total: 0, userReaction: null },
        commentCount: 0,
        shareCount: 0,
        topComments: []
      })),
      hasMore: false
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = (req, res) => {};
exports.updatePost = (req, res) => {};
exports.deletePost = (req, res) => {}; 