const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};

// 연결객체 생성
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

// db에 넣기
db.sequelize = sequelize; // db에 Sequelize 객체 넣기
db.Sequelize = Sequelize; // db에 Sequelize 패키지 넣기

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

// 모델 실행
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

// associate하기
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;
