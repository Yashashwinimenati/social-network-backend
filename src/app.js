require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Reaction = require('./models/reaction');

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', reactionRoutes);

// Error handler
app.use(require('./middleware/errorHandler'));

// Set up associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies' });
User.hasMany(Reaction, { foreignKey: 'userId', as: 'reactions' });
Post.hasMany(Reaction, { foreignKey: 'postId', as: 'reactions' });
Comment.hasMany(Reaction, { foreignKey: 'commentId', as: 'reactions' });
Reaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Reaction.belongsTo(Post, { foreignKey: 'postId' });
Reaction.belongsTo(Comment, { foreignKey: 'commentId' });

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database sync error:', err);
  }); 