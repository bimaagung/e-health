'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('OrderDetails', 'prescriptionId', { type: Sequelize.INTEGER, allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('OrderDetails', 'prescriptionId');
  }
};
