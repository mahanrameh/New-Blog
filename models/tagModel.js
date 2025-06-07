const { DataTypes } = require("sequelize");




const tag = (sequelize) => 
    sequelize.define('tag', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, 


    {
        tableName: 'tags',
        timestamps: false
    }
);





module.exports = tag;