import { gql } from '@apollo/client';

export const QUERY_MOVIES = gql`
  query movies {
    movies {
      _id
      movie_name
    }
  }
`;

export const QUERY_MOVIE = gql`
  query movie($_id: String) {
    movie(_id: $_id) {
      _id
      movie_name
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query reviews {
    reviews {
      _id
      user_id
      movie_id
      review_score
      review_text
    }
  }
`;

export const QUERY_REVIEW = gql`
  query review($_id: String) {
    review(_id: $_id) {
      user_id
      movie_id
      review_score
      review_text
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
    username
    password
    email
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: String) {
    user(_id: $_id) {
      _id
    username
    password
    email
    }
  }
`;
