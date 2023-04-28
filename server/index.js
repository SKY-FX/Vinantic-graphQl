/* server/index.js */
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb } = require("./connectToDb");

const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const PORT = process.env.PORT || 3005;
const app = express();

(async () => {
  await connectToDb();

  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  ApolloServer ready at ${url}`);
  });

  app.listen(PORT, () => {
    console.log(`🚀  Express Server listening on ${PORT}`);
  });
})();
