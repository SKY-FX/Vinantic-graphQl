const connectToDb = require("./connectToDb");
const { ApolloServer } = require("apollo-server");
const mergedSchema = require("./schema");

(async () => {
  await connectToDb();

  const server = new ApolloServer({ schema: mergedSchema });

  server
    .listen()
    .then(({ url }) => console.log(`🚀  ApolloServer ready at ${url}`));
})();
