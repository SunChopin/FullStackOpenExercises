import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage, setFavGenre }) => {
  const [username, setUsername] = useState("mluukkai");
  const [password, setPassword] = useState("secret");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message);
    },
  });
  //   console.log("login data", result.data);
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const favGenre = result.data.login.favoriteGenre;
      // console.log(favGenre);
      setToken(token);
      setFavGenre(favGenre);
      localStorage.setItem("booklist-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setPage("books");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
