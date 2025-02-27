const snap = require("./snapSubscriptions");
const user = require("./userSubscriptions");

const Subscription = {
  ...snap,
  ...user,
};

module.exports = Subscription;
