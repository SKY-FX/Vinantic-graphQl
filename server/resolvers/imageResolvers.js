const Image = require("../models/image");

const imageResolvers = {
  Query: {
    getImages: async () => {
      try {
        const images = await Image.find();

        return images.map(image => ({
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
};

module.exports = imageResolvers;
