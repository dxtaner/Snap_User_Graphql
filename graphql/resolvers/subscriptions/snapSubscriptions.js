const { withFilter } = require("apollo-server");

module.exports = {
  snap: {
    subscribe: withFilter(
      (_, __, { pubsub }) => {
        try {
          return pubsub.asyncIterator("snapAdded");
        } catch (error) {
          throw new Error(`Error subscribing to new snaps: ${error.message}`);
        }
      },
      (payload, variables) => {
        try {
          return variables.userId
            ? String(payload.snap.user_id) === variables.userId
            : true;
        } catch (error) {
          throw new Error(`Error filtering snaps: ${error.message}`);
        }
      }
    ),
  },
};
