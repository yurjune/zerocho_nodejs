const Sequelize = require('sequelize');
// const { Sequelize } = require('sequelize'); 왜 아닌지 생각하기

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // Sequelize 설정파일
const db = {};

// connecting to a database
// Sequelize 인스턴스화
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Sequelize = Sequelize; // db객체에 Sequelize 패키지 넣기
db.sequelize = sequelize; // db객체에 Sequelize 인스턴스 넣기


db.User = User;
db.Comment = Comment;

User.init(sequelize); // 미리 실행
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
