const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const User = require("./models/user");
const Author = require("./models/author");

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
    allAuthors: async () => await Author.find({}).populate("books",{ title: 1}),
    allUser: async () => await User.find({}),
  },

  Author: {
    bookCount: async ({ books }) => {
      //   results = books.filter((book) => book.author === name);
      //   results = await Book.find({ "author.name": name });
      // results = await Book.find({ author: _id });
      return books.length;
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
		
	  let authorAdd, authorAdded
      if (!author) {
        authorAdd = new Author({ name: args.author });
        authorAdded = await authorAdd.save();
        bookAdd.author = authorAdded._id;
        // authors = authors.concat({
        //   name: args.author,
        //   id: uuid(),
        // });
      } else {
        bookAdd.author = author._id;
      }

      try {
		const returnBook = await bookAdd.save();
		if (!author) {
		authorAdded.books = authorAdded.books.concat(returnBook._id)
		console.log(authorAdded)
		await authorAdd.save();
	  }else {
		author.books = author.books.concat(returnBook._id)
		await author.save();
	  }
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
      pubsub.publish("BOOK_ADDED", { bookAdded: bookAdd.populate("author") });
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
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
        favoriteGenre: user.favoriteGenre,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
