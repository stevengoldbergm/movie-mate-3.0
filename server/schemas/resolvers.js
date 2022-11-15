const { Movie, User, Review, Conversation, FriendRequest, WatchParty, PartyInvite} = require('../models');
const {AuthenticationError} = require('apollo-server-express')
const {signToken} = require('../utils/auth');
const { watch } = require('../models/watchParty');

const resolvers = {
  Query: {
   
  movies: async (parent, {imdb_id}) => {
    const movie = imdb_id ? {imdb_id}: {};
    return Movie.find(movie)
   },

  users: async (parent, {username}) => {
    const user = username ? {username}: {};
    return User.find(user)
   },

  reviews: async (parent, {movie_id}) => {
    const review = movie_id ? {movie_id}: {};
    return Review.find(review)
   },

  conversations: async (parent, {_id}) => {
    const conversation = _id ? {_id}: {}
    return Conversation.find(conversation)
   },

  friendRequest: async (parent, {_id}) => {
    const friendrequest = _id? {_id}: {}
    console.log(friendrequest)
    return FriendRequest.find(friendrequest)
   },

  me: async (parent,args,context) => {
    if (context.user) {
      return User.findOne({_id: context.user._id})
    }
      throw new AuthenticationError('Please login or signup!');
    },

  myReviews: async (parent, args, context) => {
    if (context.user) {  
      return Review.find({user_id: context.user._id})
      }  
      throw new AuthenticationError('Please login or signup!');
      },

    myFriendRequests: async (parent, args, context) => {
      if (context.user) {
        return FriendRequest.find({recipient: context.user.username})
      }
        throw new AuthenticationError('Please login or signup!')
      },

  myConversations: async (parent, args, context) => {
    if(context.user) {
    return Conversation.find({
      "participants.username": context.user.username})
   }
   throw new AuthenticationError('Please login or signup!')
  },

  myWatchParties: async(parent, args,context) =>{
    if(context.user) {
      return WatchParty.find({host: context.user.username})
    }
    throw new AuthenticationError('Please login or signup!')
  },

  myPartyInvites: async (parent, params, context) => {
    if(context.user) {
      return PartyInvite.find({recipient: context.user.username})
    }
    throw new AuthenticationError('Please login or signup!')
  }
},

  Mutation: { 
//  User sign in mutations
    createUser: async (parent, {username, email, password}) => {
      const user  = await User.create({username, email, password});
      const token = signToken(user)
      return {token, user};
    },

    loginUser: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError('No user found with this email')
      }
      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user);

      return {token, user};
    },

// Movie and review mutations
    createMovie: async (parent, args) => {
      const movie = await Movie.create(args);
      return movie;
    },

    createReview: async (parent, args, context) => {
      if (context.user) {
      const review = await Review.create({...args, user_id: context.user._id, user_name: context.user.username});
      return review}
      throw new AuthenticationError('Please login or signup!');
    },

// Chat enabling mutations
createConversation: async (parent, {username}, context) => {
  if (context.user) {
  const conversation = await Conversation.create({username});
  console.log(conversation)
  const convo = await Conversation.findOneAndUpdate(
    {_id: conversation._id},
    {$addToSet: {participants: {username: context.user.username}}},
    {new:true})
  const convo2 = await Conversation.findOneAndUpdate(
    {_id: conversation._id},
    {$addToSet: {participants: {username: username}}},
    {new:true})
  const user1 = await User.findOneAndUpdate(
    {username: context.user.username},
    {$addToSet: {conversations: {_id: conversation._id}}},
    {new: true}
  )
  const user2 = await User.findOneAndUpdate(
    {username: username},
    {$addToSet: {conversations: {_id: conversation._id}}},
    {new: true}
  )
  console.log(user1)
  console.log(user2)
  return convo2
  }
  throw new AuthenticationError('Please login or signup!')
},

sendMessage: async (parent, {conversation_id, message_text}, context) => {
  if (context.user) {
  let convo = await  Conversation.findOneAndUpdate(
    {_id: conversation_id},
    {$addToSet: {messages: {message_text: message_text, sender: context.user.username}}},
    {new: true}
  )
  console.log(convo) 
  return convo
  }
  throw new AuthenticationError('Please login or signup!')
},

// Friend enabling mutations
    createFriendRequest: async (parent, {username}, context) => {
      if (context.user) {
    console.log(username)
     const friendRequest = await FriendRequest.create({sender: context.user.username, recipient: username});
     return friendRequest
    }throw new AuthenticationError('Please login or signup!')
  },

    addFriend: async (parent, {username, requestId}, context) => {
      if (context.user) {
      const user1 = await User.findOneAndUpdate(
        {_id: context.user._id},
        {$addToSet: {friends: {username}}},
        {new: true}
      )
      console.log(user1)
      const user2 = await User.findOneAndUpdate(
        {username: username},
        {$addToSet: {friends: {username: context.user.username}}},
        {new: true}
      )
      const request = await FriendRequest.findOneAndDelete(
        {_id: requestId})
      return user1
      ;
    }
    throw new AuthenticationError('Please login or signup!')
  },
  denyFriend: async (parent, {requestId}) => {
    const request = await FriendRequest.findOneAndDelete(
      {_id: requestId})
      return request
  },
  createWatchParty: async(parent,{date, time},context) => {
    const watchParty = await WatchParty.create({date, time, host: context.user.username})
    return watchParty
  },
  inviteToWatchParty: async (parent, {username, partyId}, context) => {
    const watchParty = await WatchParty.findOneAndUpdate(
      {_id: partyId},
      {$addToSet: {recipients: {username, attending: "Pending Response"}}},
      {new: true}
    )
    return watchParty
  },
  createPartyInvite: async (parent, {date, time, username, partyId}, context) => {
    const partyInvite = await PartyInvite.create({host: context.user.username, date, time, username, partyId})
    return partyInvite
},
  acceptPartyInvite: async (parent, {partyId, inviteId}, context) => {
    const watchParty = await WatchParty.findOneAndUpdate(
      {_id: partyId, "recipients.username": context.user.username},
      {$set: {"recipients.$.attending": "Yes"}},
      {new: true}
    )
    const partyInvite = await PartyInvite.findOneAndDelete(
      {_id: inviteId})
      return watchParty
  },
  denyPartyInvite: async (parent, {partyId}, context) => {
    const watchParty = await WatchParty.findOneAndUpdate(
      {_id: partyId, "recipients.username": context.user.username},
      {$set: {"recipients.$.attending": "No"}},
      {new: true}
    )
      return watchParty
  }
 }
}

module.exports = resolvers;
