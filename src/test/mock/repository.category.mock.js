const mockCategoryRepo = ({
    getListCategory,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName,
}) => {
    const repo = {}

    const category = {
        id:1,
        name: 'flu dan batuk',
        url: 'http://cloudinary.com/image',
        is_examination:false,
        createdAt: '2022-09-07 09:36:06.000 +0700',
        updatedAt: '2022-09-07 09:36:08.000 +0700'
    }

    repo.getListCategory = jest.fn().mockReturnValue(
        getListCategory !== true ? getListCategory : [category]
    );

    repo.getCategoryById = jest.fn().mockReturnValue(
        getCategoryById !== true ? getCategoryById : category
    );

    repo.getCategoryByName = jest.fn().mockReturnValue(
        getCategoryByName !== true ? getCategoryByName : category
    );

    repo.addCategory = jest.fn().mockReturnValue(
        addCategory !== true ? addCategory : category
    );

    repo.updateCategory = jest.fn().mockReturnValue(
        updateCategory !== true ? updateCategory : true
    );

    repo.deleteCategory = jest.fn().mockReturnValue(
        deleteCategory !== true ? deleteCategory : true
    );

    return repo;

    
}

module.exports = mockCategoryRepo