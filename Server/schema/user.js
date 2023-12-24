// "typeDefs" => gak pake ":", cuman "type NAME {}"
const UserDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  } 

  type Token {
    access_token: String
  }

  input NewUser {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input LoginUser {
    username: String!
    password: String!
  }

  input FindUser {
    userId: ID
  }

  input seachBar {
    searching: String
  }
  
  type Query {
    loginUser(login: LoginUser): Token
    findUser(user: FindUser): User
    detailUser: User
    serach(search: seachBar): [User]
  }


  type Mutation {
    register(newUser: NewUser): User # gak pake ":"
  }
`;

module.exports = UserDefs;
