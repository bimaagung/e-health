class CategoryUseCase {
    constructor(categoryRepository, cloudinary){
        this._categoryRepository = categoryRepository;
        this._cloudinary = cloudinary;
    }

    async addCategory(category) {
        let result = {
            isSuccess : false,
            statusCode: null,
            reason: null,
            data: null,
        }

        const categoryValues = {
            name: category.name.toUpperCase(),
            url: null,

        }

        const categoryByName = this._categoryRepository.getCategoryByName(categoryValues.name);

        if(categoryByName !== null) {
            result.isSuccess = false;
            result.statusCode = 400;
            result.reason = 'category name already exists';

            return result;
        }

        const urlImage = this._cloudinary.uploadImage(category.filePath, 'category');
        categoryValues.url = urlImage

        const addCategory = this._categoryRepository.addCategory(categoryValues)
        
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = addCategory

        return result;

    }
}

module.exports = CategoryUseCase;