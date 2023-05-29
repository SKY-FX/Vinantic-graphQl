const { makeExecutableSchema } = require('@graphql-tools/schema');

/* Bottle Schema */
const bottleTypeDefs = require("./typeDefs/bottleTypeDefs");
const bottleResolvers = require("./resolvers/bottleResolvers");

/* Image Schema */
const imageTypeDefs = require("./typeDefs/imageTypeDefs");
const imageResolvers = require("./resolvers/imageResolvers");

/* Merge Schema */
const mergedSchema = makeExecutableSchema({
  typeDefs: [bottleTypeDefs, imageTypeDefs],
  resolvers: [bottleResolvers, imageResolvers]
});

module.exports = mergedSchema;