const { Movie, User, Review, Conversation} = require('../models');
const {AuthenticationError} = require('apollo-server-express')
const {signToken} = require('../utils/auth')

const resolvers = {
  Query: {
   
   movies: async (parent, {_id}) => {
    const movie = _id ? {_id}: {};
    return Movie.find(movie)
   },

   users: async (parent, {_id}) => {
    const user = _id ? {_id}: {};
    return User.find(user)
   },

   me: async (parent,args,context) => {
    if (context.user) {
      return User.findOne({_id: context.user._id})
    }
      throw new AuthenticationError('Please login or signup!');
    },

   reviews: async (parent, {_id}) => {
    const review = _id ? {_id}: {};
    return Review.find(review)
   },

   conversations: async (parent, {_id}) => {
    const conversation = _id ? {_id}: {}
    return Conversation.find(conversation)
   },
  },

  Mutation: {
    createMovie: async (parent, args) => {
      const movie = await Movie.create(args);
      return movie;
    },
   
    createUser: async (parent, {username, email, password}) => {
      const user  = await User.create({username, email, password});
      const token = signToken(user)
      return {token, user};
    },

    login: async (parent, {email, password}) => {
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

    createReview: async (parent, args, context) => {
      if (context.user) {
      const review = await Review.create({...args, user_id: context.user._id});
      return review}
      throw new AuthenticationError('Please login or signup!');
    },

    createConversation: async (parent, args, context) => {
      const conversation = await Conversation.create(args);
      console.log(conversation)
      console.log(context.user)
      const convo = Conversation.findOneAndUpdate(
        {_id: conversation._id},
        {$addToSet: {participants: context.user}},
        {new: true,})
      console.log(convo)
        return convo
    },

    sendMessage: async (parent, {conversation_id, message_text}, context) => {
      return Conversation.findOneAndUpdate(
        {_id: conversation_id},
        {$addToSet: {messages: { message_text, sender:context.user.username }},
      },
      {
        new: true,
        runValidators: true,
      }
      );
    },

    addFriend: async (parent, {_id, username}, context) => {
      return User.findOneAndUpdate (
        {_id: context.user._id},
        {$addToSet: {friends: {_id, username}},
      },
      {new: true,}
      );
    },
  },
};

module.exports = resolvers;
