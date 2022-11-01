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
    const user = {    
        username: "jhondoe",
        firstName : "Jhon",
        lastName: "Doe",
        email: "jhondoe@mail.com",
        phone: "081000123",
        avatar: "http://res.cloudinary.com/example",
        roleId: 2
    }
    repo.getUserByUsernameAndEmail = jest.fn().mockReturnValue(
        returnGetUserByUsernameAndEmail !== true ? returnGetUserByUsernameAndEmail : user 
    )
    repo.getAllUser = jest.fn().mockReturnValue(
        returnGetAllUser !== true ? returnGetAllUser : [user]
    )
    repo.getUserById = jest.fn().mockReturnValue(
        returnGetUserById !== true ? returnGetUserById : user
    )

    repo.getUserByEmail = jest.fn().mockReturnValue(
        returnGetUserByEmail !== true ? returnGetUserByEmail : user
    )

    repo.getUserByUsername= jest.fn().mockReturnValue(
        retrunGetUserByUsername !== true ? retrunGetUserByUsername : user
    )
    
    return repo

}

module.exports = mockAuthRepo