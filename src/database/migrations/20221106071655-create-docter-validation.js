'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocterValidations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      urlDoc: {
        type: Sequelize.STRING
      },
      docterId: {
        type: Sequelize.INTEGER
      },
      adminId: {
        type: Sequelize.INTEGER
      },  
      status: {
        type: Sequelize.STRING
      }, 
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DocterValidations');
  }
};