import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "./types";

export const getAllNotes = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};

export const createNote = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>("http://localhost:3000/api/diaries", object)
    .then((response) => response.data);
};
