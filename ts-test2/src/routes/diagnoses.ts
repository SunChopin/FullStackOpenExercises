import express from "express";
import diagnosesService from "../services/diagnosesService";
// import { DiagnosesType } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  //   const data: DiagnosesType[] = getEntries();
  res.json(diagnosesService.getEntries());
});

// router.post('/', (_req, res) => {
//   res.send('Saving a diary!');
// });

export default router;
