export interface DiagnosesType {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesType["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface dischargeType {
  date: string;
  criteria: string;
}

export interface sickLeaveType {
  startDate: string;
  endDate: string;
}
interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: sickLeaveType;
}

interface HospitalEntry extends BaseEntry {
  type: Type.Hospital;
  discharge: dischargeType;
}

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export type NonSensitivePatientType = Omit<PatientType, "ssn" | "entries">;

export type NewPatientType = Omit<PatientType, "id" | "entries">;

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;

export type OccupationalHealthcareEntryWithoutId = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type HospitalEntryWithoutId = Omit<HospitalEntry, "id">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
