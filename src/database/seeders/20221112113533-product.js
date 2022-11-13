"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          name: "Paracetamol 10MG",
          categoryId: 1,
          isStrip: true,
          price: 30000,
          description: "obat penurun panas",
          indication: "obat untuk menurunkan gejala panas",
          composition: "Zaproles 5mg",
          dose: "Sehari 3X",
          use: "Diminum sesudah makan",
          sideEffect: "alergi seperti pusing",
          segmentation: "MERAH",
          packaging: "isi 10 strip",
          manufacture: "PT. Husada Karya Daria",
          stock: 20,
          urlImage: "http://cloudinary.com/image",
          expiredAt: "2023-09-07",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Promag 10 Tablet",
          categoryId: 2,
          isStrip: true,
          price: 7500,
          description: "obat maag",
          indication: "menurunkan gejala yang berhubungan dengan asam lambung",
          composition: "Hydorcalcite 200mg",
          dose: "Sehari 3X",
          use: "Diminum sebelum makan",
          sideEffect: "alergi seperti diare",
          segmentation: "HIJAU",
          packaging: "isi 10 strip",
          manufacture: "Kalbe Farma",
          stock: 20,
          urlImage: "http://cloudinary.com/image",
          expiredAt: "2023-09-07",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
