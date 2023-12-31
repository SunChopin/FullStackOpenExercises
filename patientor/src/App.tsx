import { useState, useEffect } from "react";
// import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

// import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientInfo, setPatientInfo] = useState<Patient | undefined>();
  const [diagnosisInfo, setDiagnosisInfo] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
      const diagnosisData = await patientService.getDiagnosisInfo();
      setDiagnosisInfo(diagnosisData);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch("/patients/:id");

  useEffect(() => {
    if (match) {
      // console.log(match.params.id);
      const fetchPatientInfo = async (id: string | undefined) => {
        const result = await patientService.getById(id);
        setPatientInfo(result);
      };
      void fetchPatientInfo(match.params.id);
    }
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientInfoPage
                patientInfo={patientInfo}
                diagnosisInfo={diagnosisInfo}
                setPatientInfo={setPatientInfo}
                patients={patients}
                setPatients={setPatients}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
