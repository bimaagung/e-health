const mockAuthRepo = (
    {
        returnRegister,
        returnLogin,
        returnLoginGoogle
    }
) => {
    const repo = {}
    repo.register = jest.fn().mockReturnValue(
        returnRegister !== true ? returnRegister : {
           
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            image: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )
    repo.login = jest.fn().mockReturnValue(
        returnLogin !== true ? returnLogin : {
          
            username: "jhondoe",
            email: "jhondoe@mail.com",
            image: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )
    repo.loginGoogle = jest.fn().mockReturnValue(
        returnLoginGoogle !== true ? returnLoginGoogle : {
           
            username: "jhondoe",
            email: "jhondoe@mail.com",
            image: "http://res.cloudinary.com/example",
            roleId: 2
        }
    )
    return repo

}

module.exports = mockAuthRepo