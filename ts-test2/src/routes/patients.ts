import express from "express";
import patientsService from "../services/patientsService";
import paitentEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  //   const data: DiagnosesType[] = getEntries();
  res.json(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  //   const data: DiagnosesType[] = getEntries();
  res.json(patientsService.getEntryById(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = paitentEntry.toNewPaitentEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    // const PatientEntry = patientsService.getEntryById(req.params.id);
    const newEntries = paitentEntry.toNewEntries(req.body);
    const addedEntry = patientsService.addEntry(newEntries, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
