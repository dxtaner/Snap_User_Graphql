const Snap = {
  user: async (parent, _, { User }) => {
    try {
      const user = await User.findById(parent.user_id);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user for snap: ${error.message}`);
    }
  },
};

module.exports = Snap;
