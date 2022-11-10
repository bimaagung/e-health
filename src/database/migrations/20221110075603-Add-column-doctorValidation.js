'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('DoctorValidations', 'medicalSpecialistId', { type: Sequelize.INTEGER, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('DoctorValidations', 'medicalSpecialistId');
  }
};
