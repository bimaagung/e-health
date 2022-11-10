const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const uploadFile = multer(
  {
    storage: multer.diskStorage({}),
  },
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filePath, folder) => {
  if (typeof folder !== 'string') {
    folder = 'images';
  }

  if (folder === '') {
    folder = 'images';
  }

  let result;

  try {
    result = await cloudinary.uploader.upload(filePath, {
      use_filename: true,
      folder,
    });
  } catch (error) {
    console.error(error);
    return '';
  }

  fs.unlinkSync(filePath);

  return result.url;
};

module.exports = { cloudinaryUpload, uploadFile };
