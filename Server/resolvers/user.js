const Joi = require("joi");
const { hashing, comparePassword } = require("../helper/bcryptjs");
const { createToken, verifyToken } = require("../helper/jwt");
const { ObjectId } = require("mongodb");

// "resolvers" => pakai ":", cuman "Query: { ACTION }"
const UserResolvers = {
  Query: {
    loginUser: async (_, args, context) => {
      try {
        // console.log(args.login);
        const { username, password } = args.login;

        const { db } = context; // mongoDb
        const data = await db
          .collection("users")
          .findOne({ username: username });
        if (!data) throw new Error("username / password invalid");

        const compared = comparePassword(password, data.password);
        if (!compared) throw new Error("username / password invalid");

        // console.log(data._id, ">>>>>>>");
        const token = createToken({ id: data._id });

        return { access_token: token };
      } catch (error) {
        console.log(error);
      }
    },

    findUser: async (_, args, context) => {
      try {
        const { userId } = args.user;
        const { db } = context;
        const data = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    detailUser: async (_, args, context) => {
      try {
        const userId = await context.authentication();
        const { db } = context;
        const data = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    serach: async (_, args, context) => {
      try {
        const { searching } = args.search;
        const { db } = context;
        const regex = new RegExp(searching, "i");
        const user = await db
          .collection("users")
          .find({
            $or: [{ username: regex }, { name: regex }],
          })
          .toArray();

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args, context) => {
      // action
      // console.log(args.newUser);
      const { name, username, email, password } = args.newUser;
      const { db } = context; // mongoDb

      const schema = Joi.object({
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),

        password: Joi.string().min(5),
      });

      const { error } = schema.validate({ email, password });
      // console.log(error.details[0].message);
      if (error) throw new Error(error.details[0].message);

      const usernameUnique = await db
        .collection("users")
        .findOne({ username: username });
      const emailUnique = await db
        .collection("users")
        .findOne({ email: email });

      if (usernameUnique) throw new Error("username must be uniqe");
      if (emailUnique) throw new Error("emailUnique must be uniqe");

      const hashPass = hashing(password);

      const { insertedId } = await db.collection("users").insertOne({
        name,
        username,
        email,
        password: hashPass,
      });

      return { id: insertedId, ...args.newUser };
    },
  },
};

module.exports = UserResolvers;
