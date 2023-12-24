import { gql } from "@apollo/client";

const Query = gql`
  query Query {
    listPost {
      _id
      content
      tags
      imgUrl
      authorId
      username
      comments {
        content
        username
        authorId
        createdAt
        updatedAt
      }
      likes {
        authorId
        username
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;

module.exports = Query;
