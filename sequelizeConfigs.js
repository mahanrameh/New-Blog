const configs = require("./configs");

module.exports = {
    development : {
      username: configs.db.user,
      password: configs.db.password,
      database: configs.db.name,
      host: configs.db.host,
      port: configs.db.port,
      dialect: configs.db.dialect
    },
    test : {
      username: configs.db.user,
      password: configs.db.password,
      database: configs.db.name,
      host: configs.db.host,
      port: configs.db.port,
      dialect: configs.db.dialect
    },
    production : {
      username: configs.db.user,
      password: configs.db.password,
      database: configs.db.name,
      host: configs.db.host,
      port: configs.db.port,
      dialect: configs.db.dialect
    }

};


//* this file made instead of config.json file of sequelize