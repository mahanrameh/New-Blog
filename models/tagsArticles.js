const { DataTypes } = require("sequelize");



const tagsArticles = (sequelize) => 
    sequelize.define('article', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },


    {
        tableName: 'tagsArticles',
        timestamps: false
    }
    );




module.exports = tagsArticles;