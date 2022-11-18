const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    _id: ID!
    movie_name: String!
    imdb_id: String!
    reviews: [Review]
    Movie_name: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    reviews: [Review]
    friends: [User]
    friendRequests: [FriendRequest]
    conversations: [Conversation]
  }

  type Review {
    _id: ID!
    user_id: String!
    movie_id: String!
    review_score: String!
    review_text: String!
    movie_name: String!
    user_name: String!
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
type partyResponse {
    username: String!
    attending: String!
  }

  type WatchParty {
    _id: ID!
    host: String!
    recipients: [partyResponse]
    date: String!
    time: String!
  }
  
  type PartyInvite {
    _id: ID!
    host: String!
    recipient: String
    partyId: String!
    date: String!
    time: String!
  }

  type Query {
    movies(imdb_id: String): [Movie]
    users(username: String): [User]
    reviews(movie_id: String): [Review]
    conversations(_id: String): [Conversation]
    friendRequest(_id: String): [FriendRequest]
    me: User
    myReviews: [Review]
    myFriendRequests: [FriendRequest]
    myConversations: [Conversation]
    myWatchParties: [WatchParty]
    myPartyInvites: [PartyInvite]
    invitedWatchParties: [WatchParty]
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
      review_text: String!,
      movie_name: String!): Review

    createMovie(
      movie_name: String!,
      imdb_id: String!): Movie

    createConversation(
      username: String) : Conversation
    
    sendMessage(
      conversation_id: String!,
      message_text: String!): Conversation

    createFriendRequest(
      username: String!): FriendRequest

    addFriend(
      username: String!,
      requestId:String!): User

    denyFriend(
      requestId: String!): FriendRequest

    createWatchParty(
      date: String!
      time: String!
    ): WatchParty
    
    createPartyInvite(
      date: String!
      time: String!
      username: String!
      partyId:String!
    ): WatchParty

    inviteToWatchParty(
      username: String!
      partyId: String!
    ): WatchParty

    acceptPartyInvite(
      partyId: String!
      inviteId:String!
    ): WatchParty

    denyPartyInvite(
      partyId: String!
      inviteId: String!
    ): WatchParty
  }
`;

module.exports = typeDefs;
