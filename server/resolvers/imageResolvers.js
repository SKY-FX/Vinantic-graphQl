const { concat } = require("ramda");
const Image = require("../models/image");
const fs = require("fs");
const path = require("path");

const IMAGES_ROOT_PATH = "../../src/assets/images/";
const FOLDER_PATH = path.resolve(__dirname, "../../src/assets/images");

const imageResolvers = {
  Query: {
    getImages: async () => {
      try {
        const images = await Image.find();

        return images.map((image) => ({
          id: image._id.toString(),
          filename: image.filename,
          contentType: image.contentType,
          data: image.data.toString("base64"),
        }));
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    setImages: async () => {
      try {
        const files = fs.readdirSync(FOLDER_PATH);
        const imageFiles = files.filter(
          file => path.extname(file).toLowerCase() === ".jpg"
        );

        await saveImages(imageFiles);

        return {
          ok: true,
          message: "Toutes les images ont été ajoutées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteImages: async () => {
      try {
        await Image.deleteMany();

        return {
          ok: true,
          message: "Toutes les images ont été supprimées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const saveImages = async (imagesFiles) => {
  try {
    const savePromises = imagesFiles.map(async (image) => {
      const concatPath = concat(IMAGES_ROOT_PATH, image);
      const imagePath = path.resolve(__dirname, concatPath);

      const file = fs.readFileSync(imagePath);
      const [, extension] = imagePath.split(".");
      const contentType = `image/${extension}`;

      const newImage = new Image({
        filename: imagePath,
        contentType,
        data: file,
      });

      await newImage.save();
      console.log(`Image saved to the database: ${imagePath}`);
    });

    await Promise.all(savePromises);
  } catch (err) {
    throw new Error("An error occurred while saving the images.");
  }
};

module.exports = imageResolvers;
