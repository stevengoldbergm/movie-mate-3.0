import { gql } from '@apollo/client';

// Query all movies or a single movie by imdb id - Pass in imdb id to get single pass in nothing to get all movies
export const QUERY_MOVIES = gql`
  query Movies($imdbId: String) {
  movies(imdb_id: $imdbId) {
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
