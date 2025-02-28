module.exports = {
  createSnap: async (
    _,
    { data: { user_id, text, title, imageUrl } },
    { Snap, pubsub }
  ) => {
    try {
      const snap = await new Snap({ user_id, text, title, imageUrl }).save();

      pubsub.publish("snapAdded", { snapAdded: snap });

      return snap;
    } catch (error) {
      throw new Error(`Error creating snap: ${error.message}`);
    }
  },

  deleteSnap: async (_, { id }, { Snap }) => {
    try {
      const deletedSnap = await Snap.findByIdAndDelete(id);
      return deletedSnap;
    } catch (error) {
      throw new Error(`Error deleting snap: ${error.message}`);
    }
  },

  updateSnap: async (_, { id, data }, { Snap }) => {
    try {
      const updatedSnap = await Snap.findByIdAndUpdate(id, data, { new: true });
      return updatedSnap;
    } catch (error) {
      throw new Error(`Error updating snap: ${error.message}`);
    }
  },
};
