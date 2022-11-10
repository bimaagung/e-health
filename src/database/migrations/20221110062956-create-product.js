'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isStrip: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      indication: {
        type: Sequelize.TEXT
      },
      composition: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      dose: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      use: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sideEffect: {
        type: Sequelize.TEXT
      },
      segmentation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      packaging: {
        allowNull: false,
        type: Sequelize.STRING
      },
      manufacture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expiredAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Products');
  }
};