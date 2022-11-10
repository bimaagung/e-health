'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('MedicalSpecialists', [
      {
        id: 1,
        specialistName: "THT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        specialistName: "GIGI",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        specialistName: "JANTUNG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        specialistName: "UMUM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MedicalSpecialists', null, {});
  }
};
