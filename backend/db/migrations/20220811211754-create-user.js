'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('Users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('Users');
  }
};