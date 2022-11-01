class UserRepository {
    constructor() {
        this.UserModel = User;
    }

    async getUserByEmail(email) {
        return await this.UserModel.findOne({
            where: { email },
        });
    }
    async getUserByUsername(username) {
        return await this.UserModel.findOne({
            where: { username },
        });
    }

}

module.exports = UserRepository;