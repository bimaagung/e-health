'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Days', [
      {
        id: 1,
        dayName: "MONDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        dayName: "TUESDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        dayName: "WEDNESDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        dayName: "THURSDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        dayName: "FRIDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        dayName: "SATURDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        dayName: "SUNDAY",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Days', null, {});
  }
};
