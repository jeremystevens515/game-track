const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');

class Reviews extends Model {}

Reviews.init({
  
    review_id: {
    type: DataTypes.INTEGER,
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
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }})