const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// connecting to a database
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize); // 미리 실행
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
