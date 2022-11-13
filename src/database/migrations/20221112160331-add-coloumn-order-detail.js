'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('OrderDetails', 'urlPrescription', { type: Sequelize.STRING, allowNull: true });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('DoctorValidations', 'urlPrescription');
  }
};

