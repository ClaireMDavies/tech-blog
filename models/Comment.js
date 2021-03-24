const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postComment_id: {
      type: DataTypes.INTEGER,
      allowNullL false,
      references: {
        model: 'post',
        key: 'post_id',
      } 
    },
    comment_author: {
      type: DataTypes.INTEGER,
      allowNull: false,   
      references: {
        model: 'user',
        key: 'user_id',
      }  
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
