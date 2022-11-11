'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('DoctorValidations', 'hospitalId', { type: Sequelize.INTEGER, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('DoctorValidations', 'hospitalId');
  }
};
