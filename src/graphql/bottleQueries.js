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

export const DELETE_ALL_BOTTLES = gql`
  mutation deleteAllBottles {
    deleteAllBottles {
      ok
      message
    }
  }
`;
