const Bottle = require("../models/bottle");

const bottleResolvers = {
  Query: {
    getBottles: async () => {
      try {
        const bottles = await Bottle.find();
        return {
          ok: true,
          message: "Toutes les infos ont été récupérées à partir de la base de donnée",
          data: bottles
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    setBottles: async (root, args) => {
      try {
        const { bottles } = args;
        for (let i = 0; i < bottles.length; i++) {
          const bottle = new Bottle(bottles[i]);
          await bottle.save();
        }

        return {
          ok: true,
          message: "Toutes les bouteilles ont été ajoutées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteBottles: async () => {
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
  },
};

module.exports = bottleResolvers;
