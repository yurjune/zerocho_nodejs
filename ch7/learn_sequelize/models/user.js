const Sequelize = require('sequelize');

// sequelize의 모델은 mysql의 table에 대응
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // id는 자동으로 생성되서 생략
      name: {
        type: Sequelize.STRING(20), // mysql의 VARCHAR(20)
        allowNull: false, // NOT NULL
        unique: true, // UNIQUE INDEX
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE, // mysql DATETIME,  Sequelize.DATEONLY -> mysql DATE
        allowNull: false,
        defaultValue: Sequelize.NOW,  // DEFALUT now()
      },
    }, {  // 두번째 인수: 모델에 대한 설정
      sequelize,
      timestamps: false,  // 기본적으로 true, true이면 createdAt, updatedAt을 자동으로 넣어준다
      underscored: false, // false: snake_case, true: camelCase
      modelName: 'User',
      tableName: 'users',
      paranoid: false,  // true이면 deletedAt 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    // 외래키인 commenter 컬럼이 현재 user의 id 컬럼을 참조
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};

/* 
associations: hasOne, belongsTo, hasMany, belongsToMany

belongsToMany: 다대다 관계
ex) user간 팔로잉 팔로우 관계
*/