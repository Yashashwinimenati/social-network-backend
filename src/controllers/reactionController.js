const Reaction = require('../models/reaction');
const User = require('../models/user');

const REACTION_TYPES = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];

exports.react = async (req, res) => {
  try {
    const { reaction } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;
    if (!REACTION_TYPES.includes(reaction)) {
      return res.status(400).json({ success: false, message: 'Invalid reaction type.' });
    }
    // Remove previous reaction if exists
    await Reaction.destroy({ where: { userId, postId } });
    // Add new reaction
    await Reaction.create({ type: reaction, userId, postId });
    res.json({ success: true, message: 'Reaction added.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    await Reaction.destroy({ where: { userId, postId } });
    res.json({ success: true, message: 'Reaction removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getReactions = async (req, res) => {
  try {
    const { postId } = req.params;
    const reactions = await Reaction.findAll({
      where: { postId },
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'profilePicture'] }]
    });
    const summary = REACTION_TYPES.reduce((acc, type) => {
      acc[type] = reactions.filter(r => r.type === type).length;
      return acc;
    }, {});
    summary.total = reactions.length;
    res.json({
      success: true,
      reactions: {
        summary,
        users: reactions.map(r => ({
          id: r.user.id,
          name: `${r.user.firstName} ${r.user.lastName}`,
          profilePicture: r.user.profilePicture,
          reaction: r.type
        }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}; 