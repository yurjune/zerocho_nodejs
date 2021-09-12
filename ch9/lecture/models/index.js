const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {}
const sequelize = new Sequelize(  // db이름, 사용자 이름, 비밀번호, 나머지?
  config.database, config.username, config.password, { ...config, logging: false, },
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
