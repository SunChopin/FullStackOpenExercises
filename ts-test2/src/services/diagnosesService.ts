import diagnosesData from "../../data/diagnoses";
import { DiagnosesType } from "../types";

const getEntries = (): DiagnosesType[] => {
  return diagnosesData;
};

// const addDiary = () => {
//   return null;
// };
export default {
  getEntries,
  //   addDiary
};
