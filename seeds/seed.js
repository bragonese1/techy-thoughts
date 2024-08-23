const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(projectData);

  const comments = [
    {
      comment_text: 'Nice!',
      user_id: 1,
      post_id: 1,
    },
    {
      comment_text: 'Thanks for the Motivation',
      user_id: 2,
      post_id: 2,
    },
  ];

  await Comment.bulkCreate(comments);

  process.exit(0);
};

seedDatabase();

