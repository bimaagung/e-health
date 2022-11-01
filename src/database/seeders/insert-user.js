const bcrypt = require("bcrypt")
const avatar =require("../../internal/constant/defaultImage")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                username: "admin",
                firstName: "jhon",
                lastName: "doe",
                avatar : avatar.DEFAULT_AVATAR,
                email: "irvan@email.com",
                password: bcrypt.hashSync('password', 10),
                phone: 082311552,
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {})
    }
}