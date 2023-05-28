const { gql } = require("apollo-server");

const imageTypeDefs = gql`
  type Image {
    id: ID!
    filename: String!
    contentType: String!
    data: String
  }

  type Query {
    getImages: [Image!]!
  }
`;

module.exports = imageTypeDefs;
