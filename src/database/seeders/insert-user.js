const bcrypt = require("bcrypt")
const DEFAULT_AVATAR =require("../../internal/constant/defaultImage")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                username: "irvan28",
                firstName: "irvan",
                lastName: "taufik",
                avatar : ,
                email: "irvan@email.com",
                password: bcrypt.hashSync('123456', 10),
                phone: 082311552,
                homeId : 1,
                job : "programmer",
                roleId: 1,
                isRegistered : true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {})
    }
}