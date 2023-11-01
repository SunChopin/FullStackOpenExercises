const Recommend = (props) => {
  if (!props.show) {
    return null;
  }
  const bookRec = props.books.filter((book) =>
    book.genres.includes(props.favGenre)
  );
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        book in your favourite genres: <strong>{props.favGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookRec.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
