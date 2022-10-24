const { Movie, User, Review } = require('../models');

const resolvers = {
  Query: {
   movie: async () => {
    return Movie.find({});
   },

   user: async () => {
    return User.find({});
   },

   review: async () => {
    return Review.find({})
   }
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
