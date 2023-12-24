const { ObjectId } = require("mongodb");

// "resolvers" => pakai ":", cuman "Query: { ACTION }"
const FollowResolvers = {
  Query: {
    following: async (_, __, context) => {
      try {
        const { db } = context;
        const userId = await context.authentication();
        const following = await db
          .collection("follow")
          .aggregate([
            {
              $match: { followerId: new ObjectId(userId) },
            },
            {
              $lookup: {
                from: "users",
                localField: "followingId",
                foreignField: "_id",
                as: "userFollowing",
              },
            },
          ])
          .toArray();
        // console.log(following[0].userFollowing);
        return following;
      } catch (error) {
        console.log(error);
      }
    },

    follower: async (_, __, context) => {
      try {
        const { db } = context;
        const userId = await context.authentication();
        const follower = await db
          .collection("follow")
          .aggregate([
            {
              $match: { followingId: new ObjectId(userId) },
            },
            {
              $lookup: {
                from: "users",
                localField: "followerId",
                foreignField: "_id",
                as: "userFollowing",
              },
            },
          ])
          .toArray();

        console.log(follower[0].userFollowing);
        return follower;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    userFollowing: async (_, args, context) => {
      try {
        const { db } = context;
        const userId = await context.authentication();
        const { followingUserId } = args.following;

        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        if (!user) throw new Error("user not found");

        const followers = await db.collection("follow").findOne({
          followingId: new ObjectId(followingUserId),
          followerId: new ObjectId(userId),
        });
        if (followers) throw new Error("already following");

        await db.collection("follow").insertOne({
          followingId: new ObjectId(followingUserId),
          followerId: new ObjectId(userId),
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        });

        return { message: "succes follow" };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = FollowResolvers;
