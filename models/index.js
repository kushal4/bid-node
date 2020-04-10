const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.json')[env];
//console.log(config.database);
//connecting to mysql and fetching the db credentials from config/config.json
sequelize = new Sequelize(config.database, config.user, config.password, config)

//this is to authenticate whether a successfull connection with mysql server is made or not
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;