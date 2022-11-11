'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Hospitals',
      [
        {
          hospitalName :'RS Dokter Selamet Garut',
          province: 'Jawa Barat',
          city: 'Garut',
          postalCode: "44151",
          detailAddress: 'Jl. Rsu DR. Slamet No.12, Sukakarya, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151',
          phone :'(0262) 232720',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hospitalName :'RS Dustira Bandung',
          province: 'Jawa Barat',
          city: 'Bandung',
          postalCode: "40521",
          detailAddress: ' Jl. Dustira No.1, Baros, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521',
          phone :'(022) 6652207',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hospitals', null, {})
  },
}