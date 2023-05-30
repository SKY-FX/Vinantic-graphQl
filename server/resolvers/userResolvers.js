const User = require("../models/user");
const bcrypt = require("bcrypt");

const userResolvers = {
  Query: {
    getUser: async (root, args) => {
      try {
        const { username, password } = args;
        const user = await User.findOne({ username });

        if (!user)
          return {
            ok: false,
            message: "Utilisateur non trouvé.",
          };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return {
            ok: false,
            message: "Mot de passe incorrect.",
          };

        return {
          ok: true,
          message: "Connexion réussie.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = userResolvers;
