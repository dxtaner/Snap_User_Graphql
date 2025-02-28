const bcrypt = require("bcryptjs");
const token = require("../../../helpers/token");

module.exports = {
  createUser: async (
    _,
    { data: { username, email, password, firstName, lastName, phoneNumber } },
    { User, pubsub }
  ) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      }).save();

      pubsub.publish("userCreated", {
        userCreated: newUser,
      });

      const generatedToken = token.generate(newUser, "1h");

      return { user: newUser, token: generatedToken };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  signIn: async (_, { data: { username, password } }, { User }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User does not exist!");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Incorrect password!");
      }

      const generatedToken = token.generate(user, "1h");

      return { token: generatedToken, user: user };
    } catch (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  },

  updateUser: async (_, { id, data }, { User }) => {
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  deleteUser: async (_, { id }, { User }) => {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },
};
