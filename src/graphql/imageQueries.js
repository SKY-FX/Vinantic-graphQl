import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query getImages {
    getImages {
      id
      filename
      contentType
      data
    }
  }
`;
