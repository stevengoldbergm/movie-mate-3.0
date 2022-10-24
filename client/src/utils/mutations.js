import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation createMovie($movie_name: String!, imdb_id: String!) {
    createMovie(movie_name: $movie_name, imdb_id: $imdb_id) {
      _id
      movie_name
      imdb_id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($user_id: String!, movie_id: String!, $review_score: String!, $review_text:String!) {
    createReview(user_id: $user_id, movie_id: $movie_id, review_score: $review_score, review_text: $review_text) {
      _id
      user_id
      movie_id
      review_score
      review_text
    }
  }
`;
