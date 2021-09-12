const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,  // sns로그인 등의 경우 pw가 없을 수 있다
      },
      provider: { // 로그인 제공자
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',  // local or 네이버, 카카오, 구글..
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,  // sequelize instance passing
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  // 팔로잉: 내가 상대를 팔로잉
  // 팔로워: 상대가 나를 팔로잉
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      // 호출하는 유저는 유명인(팔로잉), 타겟 유저는 일반인(팔로워)
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
