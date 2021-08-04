const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,  // We need to pass the connection instance
      timestamps: false,
      modelName: 'Comment', // We need to choose the model name
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  // commenter
  static associate(db) {
    // belongsTo 에서 foreignKey는 자신에게 속해있는 컬럼
    // targetKey는 foreignKey가 참조하는 상대 모델의 컬럼
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};

