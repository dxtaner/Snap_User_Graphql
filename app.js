const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ApolloServer, PubSub } = require("apollo-server-express");
const { importSchema } = require("graphql-import");

const resolvers = require("./graphql/resolvers/index");

// models
const User = require("./models/User");
const Snap = require("./models/Snap");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: importSchema("./graphql/schema.graphql"),
  resolvers,
  context: ({ req }) => ({
    User,
    Snap,
    pubsub,
    activeUser: req ? req.activeUser : null,
  }),
  introspection: true,
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const app = express();

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token && token !== "null") {
    try {
      const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
      req.activeUser = activeUser;
    } catch (e) {
      console.log(e);
    }
  }

  next();
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
