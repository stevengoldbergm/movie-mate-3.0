const { Movie, User, Review } = require('../models');

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
  },
};

module.exports = resolvers;

module.exports = resolvers;
