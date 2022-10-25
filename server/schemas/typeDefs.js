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

  type Conversation {
    _id: ID!
    participants: [User]
    messages: [Message]
  }

  type Message {
    _id: ID!
    conversation_id: String!
    message_text: String!
  }

  type Query {
    movies: [Movie]
    movie(_id: String!): [Movie]
    users: [User]
    user(_id: String!): [User]
    reviews: [Review]
    review(_id: String!): [Review]
    conversations: [Conversation]
    conversation(_id: String!): [Conversation]
    messages: [Message]
    message(_id: String!): [Message]
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

    createConversation(
      participants:[User],
      messages: [Message] : Conversation
    )

    createMessage(
      conversation_id: String!,
      message_text: String!: Message
    )
  }
`;

module.exports = typeDefs;
