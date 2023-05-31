const Bottle = require("../models/bottle");

const bottleResolvers = {
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
  Mutation: {
    deleteAllBottles: async () => {
      try {
        await Bottle.deleteMany();
        return {
          ok: true,
          message: "Toutes les bouteilles ont été supprimées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  }
};

module.exports = bottleResolvers;
