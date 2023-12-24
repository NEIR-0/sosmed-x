const followDefs = `#graphql  
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  } 

  type Message {
    message: String
  }

  input Followers {
    followingUserId: String
  }

  type Query {
    following: [Follow]
    follower: [Follow]
  }

  type Mutation {
    userFollowing(following: Followers): Message
  }
`;

module.exports = followDefs;
