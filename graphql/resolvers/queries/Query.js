const Query = {
  user: async (_, { id }, { User }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },
  users: async (_, __, { User }) => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 });
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },
  activeUser: async (_, __, { activeUser, User }) => {
    try {
      if (!activeUser) {
        return null;
      }
      const user = await User.findOne({ username: activeUser.username });
      return user;
    } catch (error) {
      throw new Error(`Error fetching active user: ${error.message}`);
    }
  },
  snap: async (_, { id }, { Snap }) => {
    try {
      const snap = await Snap.findById(id);
      return snap;
    } catch (error) {
      throw new Error(`Error fetching snap: ${error.message}`);
    }
  },
  snaps: async (_, __, { Snap }) => {
    try {
      const snaps = await Snap.find({}).sort({ createdAt: -1 });
      return snaps;
    } catch (error) {
      throw new Error(`Error fetching snaps: ${error.message}`);
    }
  },
};

module.exports = Query;
