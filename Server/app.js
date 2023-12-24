require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// monngoDB
const { connect, getDB } = require("./config/mongoDB");

// schema
const UserDefs = require("./schema/user");
const postDefs = require("./schema/post");
const followDefs = require("./schema/follow");

// resolver
const UserResolvers = require("./resolvers/user");
const postResolvers = require("./resolvers/post");
const FollowResolvers = require("./resolvers/follow");

// middleware
const auth = require("./middleware/authentication");

const server = new ApolloServer({
  typeDefs: [UserDefs, postDefs, followDefs],
  resolvers: [UserResolvers, postResolvers, FollowResolvers],
  introspection: true, // untuk bisa melakukan development walaupun sudah di deploy
});

// "(async() => {} ())", defaultnya
(async () => {
  try {
    // mongoDB
    await connect();
    const db = await getDB();

    // apollo server
    await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: ({ req, res }) => {
        // authentication
        // authorize
        return {
          // middleware
          authentication: () => auth(req, res),

          // mongodb
          db,
        };
      },
    });
  } catch (error) {
    console.log("ERROR : " + error);
  }
})(); // dikasih infoke "()" lagi, agar fungsinya jalan sendiri tanpa dipanggil
