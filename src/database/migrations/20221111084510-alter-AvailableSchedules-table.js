'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.renameColumn('AvailableSchedules', 'doctorValidationId', 'doctorId')

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('AvailableSchedules', 'doctorId', 'doctorValidationId')
  }
};
