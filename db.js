const configs = require("./configs");
const {Sequelize} = require("sequelize");



//* JsDoc 
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>> } */
const userModel = require("./models/userModel")(db);

/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>> } */
const articleModel = require("./models/articleModel")(db);

/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>> } */
const tagModel = require("./models/tagModel")(db);

/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>> } */
const tagsArticles = require("./models/tagsArticles")(db);






const db = new Sequelize({
    username: configs.db.user,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    port: configs.db.port,
    dialect: configs.db.dialect,
    logging: configs.isProduction ? false: console.log
});




userModel.hasMany(articleModel, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE'
});

articleModel.belongsTo(userModel, {
    foreignKey: 'author_id',
    as: 'author'
});



articleModel.belongsToMany(tagModel, {
    through: tagsArticles,
    onDelete: 'CASCADE',
    foreignKey: 'article_id'
});

tagModel.belongsToMany(articleModel, {
    through: tagsArticles,
    onDelete: 'CASCADE',
    foreignKey: 'tag_id'
});




module.exports = {db, userModel, tagModel, articleModel, tagsArticles};