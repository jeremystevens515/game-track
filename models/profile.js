const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class profile extends Model {}
profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
              },
        phoneNumber:{
            type: DataTypes.INTEGER,
             },
        Email: {
        type: DataTypes.STRING,
       },
        
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "game",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "profile",
    }
);
module.exports = profile;
