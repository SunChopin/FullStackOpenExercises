import patientData from "../../data/patients";
import {
  PatientType,
  NonSensitivePatientType,
  NewPatientType,
  Entry,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientType[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientType[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntryById = (id: string): PatientType | undefined => {
  return patientData.find((patientEntry) => patientEntry.id === id);
};

const addPatient = (entry: NewPatientType): PatientType => {
  const id: string = uuid();
  const newPatient = {
    id,
    entries: [],
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (
  entry: EntryWithoutId,
  PatientId: string
): Entry | undefined => {
  const patienEntry = getEntryById(PatientId);
  if (patienEntry) {
    const id: string = uuid();
    const newEntry = {
      id,
      ...entry,
    };
    patienEntry.entries.push(newEntry);

    return newEntry;
  } else {
    return undefined;
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getEntryById,
  addEntry,
};
