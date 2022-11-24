'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Orders', 'prescriptionId', { type: Sequelize.INTEGER, allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Orders', 'prescriptionId');
  }
};
