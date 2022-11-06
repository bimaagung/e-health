class ValidationDocterUseCase {
    constructor(ValidationDocterRepository, UserRepository, mediaHanlder) {
        this._validationDocter = ValidationDocterRepository;
        this._userRepository = UserRepository;
        this._mediaHanlder = mediaHanlder;
    }
    async addDocterValidation(validation) {
        let result = {
            isSuccess: false,
            statusCode: null,
            reason: null,
            data: null,
        };

        const validationExist = await this._validationDocter.getDocterValdationByUserId(validation.userId)
        if (validationExist !== null) {
            result.statusCode = 400
            result.reason = "you have sent the doc, please check your email regularly for update"
            return result
        }
        const createValidation = await this._validationDocter.addDocterValidation(validation)
        result.isSuccess = true,
            result.statusCode = 201,
            result.data = createValidation
    }
}
module.exports = ValidationDocterUseCase;