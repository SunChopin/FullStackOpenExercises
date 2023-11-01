import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import { useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { SelectChangeEvent, Alert } from "@mui/material";
interface Props {
  toggleVisibility: () => void;
  formType: string;
  diagnosisCodesOption: string[];
  setPatientInfo: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patients: Patient[];
  patientInfo: Patient | undefined;
}

const AddEntryForm = ({
  toggleVisibility,
  formType,
  diagnosisCodesOption,
  patientInfo,
  patients,
  setPatientInfo,
  setPatients,
}: Props) => {
  const options = ["HealthCheck", "OccupationalHealthcare", "Hospital"];

  const [description, setDescription] = useState<string>("");
  const [dateOfEntry, setDateOfEntry] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>("");
  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.createEntry(
        values,
        patientInfo?.id
      );

      if (newEntry && patientInfo) {
        const changedPatient: Patient = {
          ...patientInfo,
          entries: patientInfo.entries.concat(newEntry),
        };
        setPatientInfo(changedPatient);
        setPatients(
          patients.map((patient) =>
            patient.id !== patientInfo.id ? patient : changedPatient
          )
        );
        toggleVisibility();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );

          setNotification(message);
          setTimeout(() => {
            setNotification("");
          }, 5000);
        } else {
        }
      } else {
        setNotification(`Unknown error: ${e}`);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    }
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  switch (formType) {
    case options[0]:
      return (
        <div>
          <div>
            {notification && <Alert severity="error">{notification}</Alert>}
          </div>
          <HealthCheckForm
            submitNewEntry={submitNewEntry}
            toggleVisibility={toggleVisibility}
            diagnosisCodesOption={diagnosisCodesOption}
            description={description}
            setDescription={setDescription}
            dateOfEntry={dateOfEntry}
            setDateOfEntry={setDateOfEntry}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            onDiagnosisCodesChange={onDiagnosisCodesChange}
          />
        </div>
      );
    case options[1]:
      return (
        <div>
          <div>
            {notification && <Alert severity="error">{notification}</Alert>}
          </div>
          <OccupationalHealthcareForm
            submitNewEntry={submitNewEntry}
            toggleVisibility={toggleVisibility}
            diagnosisCodesOption={diagnosisCodesOption}
            description={description}
            setDescription={setDescription}
            dateOfEntry={dateOfEntry}
            setDateOfEntry={setDateOfEntry}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            onDiagnosisCodesChange={onDiagnosisCodesChange}
          />
        </div>
      );
    case options[2]:
      return (
        <div>
          <div>
            {notification && <Alert severity="error">{notification}</Alert>}
          </div>
          <HospitalForm
            submitNewEntry={submitNewEntry}
            toggleVisibility={toggleVisibility}
            diagnosisCodesOption={diagnosisCodesOption}
            description={description}
            setDescription={setDescription}
            dateOfEntry={dateOfEntry}
            setDateOfEntry={setDateOfEntry}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            onDiagnosisCodesChange={onDiagnosisCodesChange}
          />
        </div>
      );
    default:
      return null;
  }
};

export default AddEntryForm;
