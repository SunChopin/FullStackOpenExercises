import {
  Patient,
  Diagnosis,
  Entry,
  Type,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Typography, Box } from "@mui/material";
import ButtonAddEntry from "./ButtonAddEntry";
import AddEntryForm from "./AddEntryForm";
import { useState } from "react";

const colorScale: string[] = ["#00FF00", "#FFFF00", "#FF9900", "#FF0000"];

interface Props {
  patientInfo: Patient | undefined;
  diagnosisInfo: Diagnosis[];
  patients: Patient[];
  setPatientInfo: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

type EntryDetailsProps = {
  entry: Entry;
};

type EntryhealthChecksProps = {
  entry: HealthCheckEntry;
};
type EntryOccupationalHealthcareProps = {
  entry: OccupationalHealthcareEntry;
};
type EntryHospitalProps = {
  entry: HospitalEntry;
};
const HealthCheck = ({ entry }: EntryhealthChecksProps) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>{entry.description}</div>
      <FavoriteIcon sx={{ color: colorScale[entry.healthCheckRating] }} />
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcare = ({
  entry,
}: EntryOccupationalHealthcareProps) => {
  return (
    <div>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <div>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const Hospital = ({ entry }: EntryHospitalProps) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case Type.HealthCheck:
      return <HealthCheck entry={entry} />;
    case Type.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    case Type.Hospital:
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage = ({
  patientInfo,
  diagnosisInfo,
  setPatientInfo,
  setPatients,
  patients,
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const diagnosisCodesOption: Array<Diagnosis["code"]> = diagnosisInfo.map(
    (v) => v.code
  );

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (!patientInfo) {
    return null;
  } else {
    return (
      <div>
        <Typography variant="h4">
          {patientInfo.name}{" "}
          {patientInfo.gender === "male" ? (
            <MaleIcon />
          ) : patientInfo.gender === "female" ? (
            <FemaleIcon />
          ) : null}
        </Typography>

        <div>ssn: {patientInfo.ssn}</div>
        <div>occupation: {patientInfo.occupation}</div>
        <div style={showWhenVisible}>
          <AddEntryForm
            toggleVisibility={toggleVisibility}
            formType={formType}
            diagnosisCodesOption={diagnosisCodesOption}
            setPatientInfo={setPatientInfo}
            setPatients={setPatients}
            patientInfo={patientInfo}
            patients={patients}
          />
        </div>
        <h3>entries</h3>
        {patientInfo.entries?.map((entry) => (
          <Box
            key={entry.id}
            sx={{
              paddingLeft: 2,
              border: "solid",
              borderWidth: 1,
              marginBottom: 1,
              borderRadius: 2,
            }}
          >
            <EntryDetails entry={entry} />
          </Box>
        ))}
        <div style={hideWhenVisible}>
          <ButtonAddEntry
            toggleVisibility={toggleVisibility}
            setFormType={setFormType}
          />
        </div>
      </div>
    );
  }
};

export default PatientInfoPage;

/* <div key={entry.id}>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes?.map((code, i) => (
          <li key={i}>
            {code}{" "}
            {diagnosisInfo.find((info) => info.code === code)?.name}
          </li>
        ))}
      </ul>
  </div> */
