const user = require("./userMutations");
const snap = require("./snapMutations");

const Mutation = {
  ...user,
  ...snap,
};

module.exports = Mutation;
