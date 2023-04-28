import { gql } from '@apollo/client';

export const GET_BOTTLES = gql`
  query getBottles {
    getBottles {
      id
      name
      price
      year
      quality
      ref
    }
  }
`;
