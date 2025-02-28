module.exports = {
  user: {
    subscribe: (parent, args, { pubsub }) => {
      try {
        return pubsub.asyncIterator("userCreated");
      } catch (error) {
        throw new Error(`Error subscribing to new users: ${error.message}`);
      }
    },
  },
};
