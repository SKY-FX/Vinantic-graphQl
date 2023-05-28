const Image = require("../models/image");

const imageResolvers = {
  Query: {
    getImages: async () => {
      try {
        const images = await Image.find();
        return images;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = imageResolvers;