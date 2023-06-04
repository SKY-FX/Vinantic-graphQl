const { gql } = require("apollo-server");

const bottleTypeDefs = gql`
  type Bottle {
    id: ID!
    name: String!
    price: Float!
    year: Int!
    quality: String!
  }

  input InputBottle {
    name: String!
    price: Int!
    year: Int!
    quality: String!
    bottleRef: String!
    bottleType: String!
    city: String!
    quantity: Int!
    wineType: String!
  }

  type mutationResponse {
    ok: Boolean!
    message: String!
  }

  type Query {
    getBottles: [Bottle!]!
  }

  type Mutation {
    setBottles(bottles: [InputBottle!]!): mutationResponse!
  }

  type Mutation {
    deleteBottles: mutationResponse!
  }
`;

module.exports = bottleTypeDefs;
