// interface BmiValues {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: string[]): BmiValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     if (Number(args[3]) === 0) throw new Error("Can't divide by 0!");
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100; // Convert height from centimeters to meters
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal (healthy weight)";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return category;
};

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   const result: string = calculateBmi(value1, value2);
//   console.log(result);
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
