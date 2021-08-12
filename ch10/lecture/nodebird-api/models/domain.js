const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      host: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {
        // ENUM: 문자열 
        type: Sequelize.ENUM('free', 'premium'),  // 둘중 하나만 가능
        allowNull: false,
      },
      clientSecret: {
        type: Sequelize.STRING(36),
        // type: Sequelize.UUID,  // 올바른 UUID인지 검사를 하고싶으면
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};
