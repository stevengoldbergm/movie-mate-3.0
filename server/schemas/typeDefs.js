const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    _id: ID!
    movie_name: String!
    imdb_id: String!
    reviews: [Review]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    reviews: [Review]
    friends: [User]
  }

  type Review {
    _id: ID!
    user_id: String!
    movie_id: String!
    review_score: String!
    review_text: String!
  }

  type Query {
    movie: [Movie]
    user: [User]
    review: [Review]
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!): User
    
    createReview(
      user_id:String!,
      movie_id: String!,
      review_score: String!,
      review_text: String!): Review

    createMovie(
      movie_name: String!
      imdb_id: String!): Movie
  }
`;

module.exports = typeDefs;
