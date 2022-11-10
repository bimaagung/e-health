'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Categories',
      'url'
    );
    await queryInterface.removeColumn(
      'Categories',
      'is_examination'
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn('Categories','url', { type: DataTypes.STRING });
     await queryInterface.addColumn('Categories', 'is_examination', { type: DataTypes.BOOLEAN });
  }
};
