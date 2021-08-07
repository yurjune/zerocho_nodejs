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
  /*
  팔로잉: 내가 상대를 팔로잉
  팔로워: 상대가 나를 팔로잉
  */

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {  // 유저 간 다대다 관계
      /* 
      foreignKey가 없으면 둘다 userId, userId이므로 팔로우, 팔로잉 구분을 위해 설정
      foreignKey와 as는 서로 반대관계
      일반인이 유명인을 팔로우: followerId는 일반인, followingId는 유명인
      ex) 어떤 유저(유명인)의 팔로워들을 가져오려면 followerId가 아닌 followingId를 알아야 한다
      */
      foreignKey: 'followingId',
      as: 'Followers',  // 컬럼에 대한 별명
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};
