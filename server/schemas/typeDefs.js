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
    friendRequests: [FriendRequest]
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

  type FriendRequest {
    _id: ID!
    sender: String!
    recipient: String!
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
    friendRequest(_id: String): [FriendRequest]
    me: User
    myReviews: [Review]
    myFriendRequests: [FriendRequest]
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!): Auth
    
    loginUser(
      email: String!, 
      password: String!): Auth
    
    createReview(
      movie_id: String!,
      review_score: String!,
      review_text: String!): Review

    createMovie(
      movie_name: String!,
      imdb_id: String!): Movie

    createConversation(
      username: String
      ) : Conversation
    
    updateConversation(
      username: String
      _id: String
    ) : Conversation
    
    sendMessage(
      conversation_id: String!,
      message_text: String!): Message

    createFriendRequest(
      username: String!
    ): FriendRequest

    addFriend(
      _id: ID!
      username: String!): User
  }
`;

module.exports = typeDefs;
