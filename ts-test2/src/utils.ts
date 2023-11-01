import {
  NewPatientType,
  Gender,
  Entry,
  Type,
  sickLeaveType,
  EntryWithoutId,
  DiagnosesType,
  HealthCheckRating,
  HealthCheckEntryWithoutId,
  HospitalEntryWithoutId,
  OccupationalHealthcareEntryWithoutId,
  dischargeType,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const isType = (param: string): param is Type => {
  return Object.values(Type)
    .map((v) => v.toString())
    .includes(param);
};

const toEntries = (entries: unknown): Entry[] => {
  if (entries instanceof Array) {
    if (entries.length > 0) {
      if (!entries.every((v: Entry) => isType(v.type))) {
        throw new Error("incorrect type value in entries" + entries);
      }
    }
  } else {
    throw new Error("incorrect entries" + entries);
  }

  return entries as Entry[];
};

const toNewPaitentEntry = (object: unknown): NewPatientType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatientType = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseEmployerName = (object: unknown): string => {
  if (!object || typeof object !== "object" || !("employerName" in object)) {
    // we will just trust the data to be in correct form
    throw new Error("Incorrect data: employerName field missing");
  }
  if (!isString(object.employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return object.employerName;
};

const parseType = (object: unknown): Type => {
  if (!isString(object) || !isType(object)) {
    throw new Error("Incorrect type: " + object);
  }
  return object;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosesType["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosesType["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnosesType["code"]>;
};

const parseSickLeave = (object: unknown): sickLeaveType => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    // we will just trust the data to be in correct form
    return {} as sickLeaveType;
  }
  if (
    !object.sickLeave ||
    typeof object.sickLeave !== "object" ||
    !("startDate" in object.sickLeave) ||
    !("endDate" in object.sickLeave)
  ) {
    return {} as sickLeaveType;
  }

  // if (
  //   !isString(object.sickLeave.startDate) ||
  //   !isDate(object.sickLeave.startDate) ||
  //   !isString(object.sickLeave.endDate) ||
  //   !isDate(object.sickLeave.endDate)
  // ) {
  //   return {} as sickLeaveType;
  // }

  return object.sickLeave as sickLeaveType;
};

const parseDischarge = (object: unknown): dischargeType => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    // we will just trust the data to be in correct form
    return {} as dischargeType;
  }
  if (
    !object.discharge ||
    typeof object.discharge !== "object" ||
    !("date" in object.discharge) ||
    !("criteria" in object.discharge)
  ) {
    return {} as dischargeType;
  }

  return object.discharge as dischargeType;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (
    !object ||
    typeof object !== "object" ||
    !("healthCheckRating" in object)
  ) {
    // we will just trust the data to be in correct form
    throw new Error("Incorrect data: healthCheckRating field missing");
  }
  if (
    !isNumber(object.healthCheckRating) ||
    !isHealthCheckRating(object.healthCheckRating)
  ) {
    throw new Error("Incorrect type: " + object.healthCheckRating);
  }

  return object.healthCheckRating;
};

const toNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const description = parseDescription(object.description);
    const date = parseDateOfBirth(object.date);
    const specialist = parseSpecialist(object.specialist);
    const diagnosisCodes = parseDiagnosisCodes(object);
    const type = parseType(object.type);

    switch (type) {
      case Type.HealthCheck:
        const healthCheckRating = parseHealthCheckRating(object);
        const newHealthCheckEntry: HealthCheckEntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          healthCheckRating,
        };
        return newHealthCheckEntry;
      case Type.OccupationalHealthcare:
        const employerName = parseEmployerName(object);
        const sickLeave = parseSickLeave(object);
        const newOccupationalHealthcareEntry: OccupationalHealthcareEntryWithoutId =
          {
            description,
            date,
            specialist,
            diagnosisCodes,
            type,
            sickLeave,
            employerName,
          };
        return newOccupationalHealthcareEntry;
      case Type.Hospital:
        const discharge = parseDischarge(object);
        const newHospitalEntry: HospitalEntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          discharge,
        };
        return newHospitalEntry;
    }
  }

  throw new Error("Incorrect data: a field missing");
};

export default { toEntries, toNewPaitentEntry, toNewEntries };
