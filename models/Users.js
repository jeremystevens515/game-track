const { DataTypes } = require("sequelize");

user_id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
        model:URLSearchParams,
        key:"user_id"
    }
}