import axios from "axios";
import {
  Patient,
  PatientFormValues,
  Diagnosis,
  EntryWithoutId,
  Entry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getDiagnosisInfo = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getById = async (id: string | undefined) => {
  const { data } = await axios.get<Patient | undefined>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: EntryWithoutId, id: string | undefined) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getById,
  getDiagnosisInfo,
  createEntry,
};
