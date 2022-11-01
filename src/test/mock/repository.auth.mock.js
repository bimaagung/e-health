const mockAuthRepo = (
    {
        returnRegister,
        returnLogin,
        returnLoginGoogle
    }
) => {
    const repo = {}

    const user = {
            username: "jhondoe",
            firstName : "Jhon",
            lastName: "Doe",
            email: "jhondoe@mail.com",
            phone: "081000123",
            image: "http://res.cloudinary.com/example",
            roleId: 2
    }
    repo.register = jest.fn().mockReturnValue(
        returnRegister !== true ? returnRegister : user
    )
    repo.login = jest.fn().mockReturnValue(
        returnLogin !== true ? returnLogin : user
    )
    repo.loginGoogle = jest.fn().mockReturnValue(
        returnLoginGoogle !== true ? returnLoginGoogle :user
    )
    return repo

}

module.exports = mockAuthRepo