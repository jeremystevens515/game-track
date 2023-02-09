const {Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")

class Users extends Model{}


Users.init(
{
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
}
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored:true,
    modelName:'users',
})