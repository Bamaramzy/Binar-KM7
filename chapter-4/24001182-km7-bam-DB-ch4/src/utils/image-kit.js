// src/utils/image-kit.js
const ImageKit = require("imagekit");

const imageKitInstance = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const imageUpload = async (file) => {
  return new Promise((resolve, reject) => {
    imageKitInstance.upload(
      {
        file: file.data, // Upload file buffer
        fileName: file.name, // Original file name
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};

module.exports = {
  imageUpload,
};
