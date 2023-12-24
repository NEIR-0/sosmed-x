const postDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    username: String
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  } 

  type Comment {
    content: String!
    username: String
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  type Like {
    authorId: ID!
    username: String
    createdAt: String
    updatedAt: String
  }

  type Message {
    message: String
  }

  input CreatePost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  input CreateComment {
    content: String!
    postId: String
  }

  input PostId {
    postId: ID
  }

  type Query {
    listPost: [Post]
    postById(post: PostId): Post
  }

  type Mutation {
    createPost(newPost: CreatePost): Message
    createComment(newComment: CreateComment): Post
    createLike(like: PostId): Post
  }
`;

module.exports = postDefs;
