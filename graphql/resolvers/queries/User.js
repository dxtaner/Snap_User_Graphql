const User = {
  snaps: async (parent, _, { Snap }) => {
    try {
      const snaps = await Snap.find({ user_id: parent._id });
      return snaps;
    } catch (error) {
      throw new Error(`Error fetching snaps for user: ${error.message}`);
    }
  },
};

module.exports = User;
