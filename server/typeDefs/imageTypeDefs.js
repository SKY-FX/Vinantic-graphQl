const { gql } = require("apollo-server");

const imageTypeDefs = gql`
  type Image {
    id: ID!
    filename: String!
    contentType: String!
    data: String!
  }

  type mutationResponse {
    ok: Boolean!
    message: String!
  }

  type Query {
    getImages: [Image!]!
  }

  type Mutation {
    setImages: mutationResponse!
  }

  type Mutation {
    deleteImages: mutationResponse!
  }
`;

module.exports = imageTypeDefs;
