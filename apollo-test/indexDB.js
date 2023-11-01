const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: async (root, args, context) => context.currentUser,
    allBooks: async (root, args) => {
      //   if (args.author || args.genre) {
      //     return books.filter(
      //       (book) =>
      //         (args.author ? book.author === args.author : true) &&
      //         (args.genre ? book.genres.includes(args.genre) : true)
      //     );
      //   }
      if (args.genre) {
        return Book.find({ "genres": args.genre }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    allUser: async () => await User.find({}),
  },

  Author: {
    bookCount: async ({ _id }) => {
      //   results = books.filter((book) => book.author === name);
      //   results = await Book.find({ "author.name": name });
      results = await Book.find({ author: _id });
      return results.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      //   const author = authors.find((p) => p.name === args.author);
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.author });
      const bookAdd = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      if (!author) {
        const authorAdd = new Author({ name: args.author });
        const authorAdded = await authorAdd.save();
        bookAdd.author = authorAdded._id;
        // authors = authors.concat({
        //   name: args.author,
        //   id: uuid(),
        // });
      } else {
        bookAdd.author = author._id;
      }

      try {
        await bookAdd.save();
      } catch (error) {
        throw new GraphQLError("adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      //   const book = { ...args, id: uuid() };
      //   books = books.concat(book);
      // const updatedAuthor = { ...author, bookCount: author.bookCount+1 }
      // authors = authors.map(p => p.name === args.author ? updatedAuthor : p)
      return bookAdd.populate("author");
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      //   const author = authors.find((p) => p.name === args.name);
      const author = await Author.findOne({ name: args.name });
      //   if (!author) {
      //     return null;
      //   }

      //   const updatedAuthor = { ...author, born: args.setBornTo };
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Setting born failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      //   authors = authors.map((p) => (p.name === args.name ? updatedAuthor : p));
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({ ...args });
      return await user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,	
        id: user._id
      };
	
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET), favoriteGenre: user.favoriteGenre };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
