import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAllNotes, createNote } from "./noteService";
import axios from "axios";

interface NotificationProps {
  notification: string;
}

const Notification = (props: NotificationProps) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (props.notification) {
    return <div style={style}>{props.notification}</div>;
  } else {
    return null;
  }
};

const App = () => {
  const [notes, setNotes] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(date);
    console.log(weather);
    console.log(visibility);
    createNote({ date, weather, visibility, comment })
      .then((data) => {
        setNotes(notes.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data);
          setTimeout(() => {
            setNotification("");
          }, 2000);
        } else {
          console.error(error);
          setNotification(error);
          setTimeout(() => {
            setNotification("");
          }, 2000);
        }
      });

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification notification={notification} />
      <form onSubmit={noteCreation}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="weather">weather: </label>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value={weather}
            checked={weather === "sunny"}
            onChange={() => setWeather("sunny")}
            required
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value={weather}
            checked={weather === "cloudy"}
            onChange={() => setWeather("cloudy")}
            required
          />
          <label htmlFor="cloudy">cloudy</label>
        </div>
        <div>
          visibility <label htmlFor="visibility">visibility: </label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value={visibility}
            checked={weather === "good"}
            onChange={() => setVisibility("good")}
            required
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value={visibility}
            checked={weather === "poor"}
            onChange={() => setVisibility("poor")}
            required
          />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <h3>{note.date}</h3>
            <div>visibility: {note.visibility}</div>
            <div>weather: {note.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
