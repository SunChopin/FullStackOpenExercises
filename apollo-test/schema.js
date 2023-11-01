const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }
  
  type Token {
    value: String!
	favoriteGenre: String!
	
  }

  type Author {
    name: String!
    born: Int
	books: [Book!]!
    bookCount: Int!
    id: ID!
  }

   type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String 
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    allUser: [User!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
