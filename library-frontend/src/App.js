import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ALL_AUTHORS, BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  // const uniqByName = (a) => {
  //   let seen = new Set();
  //   return a.filter((item) => {
  //     let k = item.name;
  //     return seen.has(k) ? false : seen.add(k);
  //   });
  // };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });

  // cache.updateQuery(query, ({ allAuthors }) => {
  //   return {
  //     allAuthors: uniqByTitle(allBooks.concat(addedBook)),
  //   };
  // });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favGenre, setFavGenre] = useState("");
  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      alert(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      // updateCache(client.cache, { query: ALL_AUTHORS }, addedBook.author);
    },
  });
  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={resultAuthors.data.allAuthors}
        token={token}
      />

      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      {token && <NewBook show={page === "add"} />}
      {token && (
        <Recommend
          show={page === "recommend"}
          books={resultBooks.data.allBooks}
          favGenre={favGenre}
        />
      )}
      {!token && (
        <LoginForm
          show={page === "login"}
          setToken={setToken}
          setPage={setPage}
          setFavGenre={setFavGenre}
        />
      )}
    </div>
  );
};

export default App;
