const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//Setting up one to many relationship between User and Post
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Setting up one to many relationship between Post and Comment

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });

//Setting up one to many relationship between User and Comment

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });


module.exports = { User, Post, Comment };
