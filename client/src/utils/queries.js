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

// Query all reviews or all reviews for a single movie by imdb id - Pass in imdb id to get for a single movie pass in nothing to get all reviews
export const QUERY_REVIEWS = gql`
  query Reviews($movieId: String) {
  reviews(movie_id: $movieId) {
    review_score
    review_text
    user_id
  }
}
`;

// Query all users or a single user by passing in username
export const QUERY_USERS = gql`
query Users($username: String) {
  users(username: $username) {
    username
    email
  }
}
`;

// Query the logged in user based on context 
export const ME = gql`
  query Me {
  me {
    username
    email
  }
}
`;

// Quety all friend requests in which the recipient is the logged in user based on context
export const MY_FRIEND_REQUESTS = gql`
query MyFriendRequests {
  myFriendRequests {
    sender
  }
}
`
