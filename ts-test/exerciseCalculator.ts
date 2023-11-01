interface ExerciseResult {
  numDays: number;
  trainingDays: number;
  target: number;
  averageTime: number;
  targetReached: boolean;
  rating: 1 | 2 | 3;
  ratingText: string;
}

export const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): ExerciseResult => {
  const numDays: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(
    (hours) => hours > 0
  ).length;
  const target: number = targetHours;
  const averageTime: number =
    exerciseHours.reduce((total, hours) => total + hours, 0) / numDays;
  const targetReached: boolean = averageTime >= target;

  let rating: 1 | 2 | 3;
  if (averageTime >= target) {
    rating = 1;
  } else if (averageTime >= target / 2) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingText: string;
  switch (rating) {
    case 1:
      ratingText = "Excellent";
      break;
    case 2:
      ratingText = "Good";
      break;
    case 3:
      ratingText = "Average";
      break;
    default:
      ratingText = "";
  }

  const result: ExerciseResult = {
    numDays,
    trainingDays,
    target,
    averageTime,
    targetReached,
    rating,
    ratingText,
  };

  return result;
};

// const exerciseHours: number[] = [3, 0, 2, 4.5, 0, 3, 1]; // Fill in the exercise hours for each day
// const targetHours: number = 2; // Fill in the target hours

// const exerciseResult: ExerciseResult = calculateExercises(
//   exerciseHours,
//   targetHours
// );
// console.log(exerciseResult);

// const args: string[] = process.argv.slice(2);

// try {
//   const targetHours: number = parseFloat(args.shift() || "");
//   const exerciseHours: number[] = args.map((arg) => {
//     const hours = parseFloat(arg);
//     if (isNaN(hours)) {
//       throw new Error("Invalid input: Exercise hours must be numeric values");
//     }
//     return hours;
//   });

//   const exerciseResult: ExerciseResult = calculateExercises(
//     exerciseHours,
//     targetHours
//   );
//   console.log(exerciseResult);
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
