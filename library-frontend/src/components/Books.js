import { useState, useEffect } from "react";
const Books = (props) => {
  const [booksToShow, setBooksToShow] = useState([]);
  useEffect(() => {
    setBooksToShow(props.books);
  }, [props.books]);

  const books = props.books;
  // console.log(books);
  if (!props.show) {
    return null;
  }

  const genreList = Array.from(
    new Set(books.reduce((carry, current) => [...carry, ...current.genres], []))
  );

  const handleClick = (genre) => {
    setBooksToShow(books.filter((book) => book.genres.includes(genre)));
  };
  const handleClickAll = () => {
    setBooksToShow(books);
  };
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map((b) => (
        <button key={b} onClick={() => handleClick(b)}>
          {b}
        </button>
      ))}
      <button onClick={handleClickAll}>all</button>
    </div>
  );
};

export default Books;
