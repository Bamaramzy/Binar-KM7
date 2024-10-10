const ImageKit = require("imagekit");

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Image upload function to ImageKit
exports.imageUpload = async (file) => {
  const uploadedFile = await imagekit.upload({
    file: file.data, // The actual file data
    fileName: file.name, // The name of the file
  });
  return uploadedFile?.url; // Return the URL of the uploaded file
};
