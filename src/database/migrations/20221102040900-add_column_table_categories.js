'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Categories', 'is_examination', { type: Sequelize.BOOLEAN, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Categories', 'is_examination');
  }
};
