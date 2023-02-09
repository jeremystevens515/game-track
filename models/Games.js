const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');

class Games extends Model{}

Games.init({
  
    game_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  modelName:'Games',
  freezeTableName: true,
  underscored: true,

})
  