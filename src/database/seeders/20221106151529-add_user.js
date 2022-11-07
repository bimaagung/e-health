const bcrypt = require("bcrypt")
'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: "admin",
        firstName: "Admin",
        lastName: "Testing",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        phone: "0876454767652",
        avatar: "https://ui-avatars.com/api/?name=Admin+Testing",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "dokter",
        firstName: "Dokter",
        lastName: "Testing",
        email: "dokter@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        phone: "0876454764738",
        avatar: "https://ui-avatars.com/api/?name=Dokter+Testing",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "customer",
        firstName: "Customer",
        lastName: "Testing",
        email: "customer@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        phone: "087645637652",
        avatar: "https://ui-avatars.com/api/?name=Customer+Testing",
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
