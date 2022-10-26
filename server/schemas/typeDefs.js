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
    conversation_name: String!
    participants: [User]
    messages: [Message]
  }

  type Message {
    _id: ID!
    conversation_id: String!
    message_text: String!
    time_sent: String!
    sender: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    movies(_id: String): [Movie]
    users(_id: String): [User]
    reviews(_id: String): [Review]
    conversations(_id: String): [Conversation]
    me: User
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!): Auth
    
    login(
      email: String!, 
      password: String!): Auth
    
    createReview(
      movie_id: String!,
      review_score: String!,
      review_text: String!): Review

    createMovie(
      movie_name: String!,
      imdb_id: String!): Movie

    createConversation(conversation_name: String!) : Conversation
    
    sendMessage(
      conversation_id: String!,
      message_text: String!): Message

    addFriend(
      _id: ID!
      username: String!): User
  }
`;

module.exports = typeDefs;
