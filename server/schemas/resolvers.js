const { args } = require('mongoose/lib/utils');
const { Movie, User, Review, Conversation, Message } = require('../models');

const resolvers = {
  Query: {
   movies: async () => {
    return Movie.find({});
   },

   movie: async (parent, {_id}) => {
    const movie = _id ? {_id}: {};
    return Movie.find(movie)
   },

   users: async () => {
    return User.find({});
   },

   user: async (parent, {_id}) => {
    const user = _id ? {_id}: {};
    return User.find(user)
   },

   reviews: async () => {
    return Review.find({})
   },

   review: async (parent, {_id}) => {
    const review = _id ? {_id}: {};
    return Review.find(review)
   },

   conversations: async () => {
    return Conversation.find({})
   },

   conversation: async (parent, {_id}) => {
    const conversation = _id ? {_id}: {}
    return Conversation.find(conversation)
   },

   messages: async () => {
    return Message.find({})
   },

   message: async (parent, {_id}) => {
    const message = _id ? {_id}: {}
    return Message.find(message)
   },
  },
  Mutation: {
    createMovie: async (parent, args) => {
      const movie = await Movie.create(args);
      return movie;
    },
   
    createUser: async (parent ,args) => {
      const user  = await User.create(args);
      return user;
    },

    createReview: async (parent, args) => {
      const review = await Review.create(args);
      return review;
    },

    createConversation: async (parent,args) =>{
      const conversation = await Conversation.create(args);
      return conversation
    },

    createMessage: async (parent, args) => {
      const message = await Message.create(args);
      
      return message;
    }
  },
};

module.exports = resolvers;
