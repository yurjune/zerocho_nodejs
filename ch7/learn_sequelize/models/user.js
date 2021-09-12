const Sequelize = require('sequelize');

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
    }, {  // 두 번째 인수: 모델에 대한 설정
      sequelize,
      timestamps: false,  // 기본적으로 true, true이면 createdAt, updatedAt을 자동으로 넣어준다
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,  // true이면 deletedAt 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
