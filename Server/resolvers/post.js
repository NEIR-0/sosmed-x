const { ObjectId } = require("mongodb");
const redis = require("../redis");

const postResolvers = {
  Query: {
    listPost: async (_, __, context) => {
      try {
        const { db } = context;
        await context.authentication(); // authentication

        // pakai redis
        const postCache = await redis.get("post:all");
        let result;

        if (postCache) {
          result = JSON.parse(postCache);
          console.log("dari redis");
        } else {
          const post = await db
            .collection("post")
            .find()
            .sort({ createdAt: -1 })
            .toArray();
          // akalain buat pending, pakai "Promise.all()"
          const data = await Promise.all(
            post.map(async (el) => {
              const user = await db
                .collection("users")
                .findOne({ _id: el.authorId });
              el.username = user ? user.username : null;
              return el;
            })
          );
          // console.log(data);

          result = post;
          await redis.set("post:all", JSON.stringify(data));
          console.log("dari mongodb");
        }

        // console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    postById: async (_, args, context) => {
      try {
        const { postId } = args.post;
        const { db } = context;
        const post = await db
          .collection("post")
          .findOne({ _id: new ObjectId(postId) });

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, args, context) => {
      try {
        const { content, tags, imgUrl } = args.newPost;
        console.log(content, tags, imgUrl);
        const { db } = context;
        const userId = await context.authentication();
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        // console.log(user);
        await db.collection("post").insertOne({
          content,
          tags,
          imgUrl,
          username: user.username,
          authorId: new ObjectId(userId), // biar jadi "ObjectId", bukan cuman "string"
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          comments: [],
          likes: [],
        });

        // const posted = await db
        //   .collection("post")
        //   .findOne({ authorId: new ObjectId(userId) });
        // console.log(posted);

        await redis.del("post:all"); // delete redis
        return { message: "success add post" };
      } catch (error) {
        console.log(error);
      }
    },

    createComment: async (_, args, context) => {
      try {
        const { db } = context;
        const userId = await context.authentication();
        const { content, postId } = args.newComment;

        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });

        const obj = {
          content: content,
          username: user.username,
          authorId: new ObjectId(userId),
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        };

        await db
          .collection("post")
          .updateOne(
            { _id: new ObjectId(postId) },
            { $push: { comments: obj } }
          );

        const post = await db
          .collection("post")
          .findOne({ _id: new ObjectId(postId) });
        return post;
      } catch (error) {
        console.log(error);
      }
    },

    createLike: async (_, args, context) => {
      try {
        // console.log(args);
        const userId = await context.authentication();
        const { db } = context;
        const { postId } = args.like;
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        const obj = {
          username: user.username,
          authorId: new ObjectId(userId),
          createdAt: Date.now().toString,
          updatedAt: Date.now().toString,
        };
        console.log(obj, "<<<<<<<<<");

        await db.collection("post").updateOne(
          { _id: new ObjectId(postId) },
          {
            $push: { likes: obj },
          }
        );

        const post = await db
          .collection("post")
          .findOne({ _id: new ObjectId(postId) });

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = postResolvers;
