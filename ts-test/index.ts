import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

interface BMIResult {
  weight: number;
  height: number;
  bmi: string;
}

interface reqExercise {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "Invalid height or weight provided" });
  }

  const bmi = calculateBmi(height, weight);

  const result: BMIResult = {
    weight,
    height,
    bmi,
  };

  return res.json(result);
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reqData: reqExercise = req.body;
  console.log(req.body);
  if (!reqData.daily_exercises || !reqData.target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  const { daily_exercises, target } = reqData;

  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exerciseResult = calculateExercises(daily_exercises, target);

  return res.json(exerciseResult);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
