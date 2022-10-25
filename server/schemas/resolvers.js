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
  },
  Mutation: {
    createMovie: async (parent, args) => {
      const movie = await Movie.create(args);
      return movie;
    },
   
    createUser: async (parent, args) => {
      const user  = await User.create(args);
      return user;
    },

    createReview: async (parent, args) => {
      const review = await Review.create(args);
      return review;
    },

    createConversation: async (parent, args) => {
      const conversation = await Conversation.create(args);
      return conversation
    },

    sendMessage: async (parent, {conversation_id, message_text, sender}) => {
      // const message = await Message.create(conversation_id, message_text);
      return Conversation.findOneAndUpdate(
        {_id: conversation_id},
        {$addToSet: {messages: { message_text, sender }},
      },
      {
        new: true,
        runValidators: true,
      }
      );
    },
  },
};

module.exports = resolvers;
