import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR } from "../queries";

const SetBirth = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");
  const [editAuthorInfo] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();

    editAuthorInfo({ variables: { name, born } });

    // setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <select
          name="name-selected"
          defaultValue={name}
          onChange={({ target }) => setName(target.value)}
        >
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && <SetBirth authors={authors} />}
    </div>
  );
};

export default Authors;
