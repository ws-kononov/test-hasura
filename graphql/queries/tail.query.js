import { gql } from '@apollo/client';

export const GET_DATA_BY_TAIL = gql`
    query GetDataByTail($tail: String) {
      long_tails(where: {tail: {_eq: $tail}}) {
        json_id
        tail
    }
  }`