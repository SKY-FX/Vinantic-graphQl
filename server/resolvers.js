const Bottle = require("./models/bottle");

const resolvers = {
  Query: {
    getBottles: async () => {
      try {
        const bottles = await Bottle.find();
        return bottles;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
