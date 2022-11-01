const mockAuthRepo = (
    {
        returnGetUserByUsernameAndEmail,
        returnGetAllUser,
        returnGetUserById,
        returnGetUserByEmail,
        retrunGetUserByUsername,

    }
) => {
    const repo = {}
    repo.getUserByUsernameAndEmail = jest.fn().mockReturnValue(
        returnGetUserByUsernameAndEmail !== true ? returnGetUserByUsernameAndEmail : {
           
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            avatar: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )
    repo.getAllUser = jest.fn().mockReturnValue(
        returnGetAllUser !== true ? returnGetAllUser : [{
          
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            avatar: "http://res.cloudinary.com/example",
            roleId: 2
        }]
    )
    repo.getUserById = jest.fn().mockReturnValue(
        returnGetUserById !== true ? returnGetUserById : {
           
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            avatar: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )

    repo.getUserByEmail = jest.fn().mockReturnValue(
        returnGetUserByEmail !== true ? returnGetUserByEmail : {
           
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            avatar: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )

    repo.getUserByUsername= jest.fn().mockReturnValue(
        retrunGetUserByUsername !== true ? retrunGetUserByUsername : {
           
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            avatar: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )
    
    return repo

}

module.exports = mockAuthRepo