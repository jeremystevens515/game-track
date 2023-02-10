const {Model, DataTypes } = require('sequelize');
const Sequelize =require('../config/connection');

class Wishlist extends Model{}

Wishlist.init({
    wishlist_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey: true
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Games,
        key: "game_id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "user_id"
      }
    }
  },
  {
    sequelize,
    modelName:'Wishlist',
    freezeTableName: true,
    underscored: true,
  }
  )