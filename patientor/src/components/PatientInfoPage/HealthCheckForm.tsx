import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  Rating,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { EntryWithoutId, Type, HealthCheckRating } from "../../types";

interface Props {
  onDiagnosisCodesChange: (event: SelectChangeEvent<string[]>) => void;
  submitNewEntry: (values: EntryWithoutId) => void;
  toggleVisibility: () => void;
  diagnosisCodesOption: string[];
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  dateOfEntry: string;
  setDateOfEntry: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: string[];
}

const labels: { [index: string]: string } = {
  1: "Healthy",
  2: "LowRisk",
  3: "HighRisk",
  4: "CriticalRisk",
};
const HealthCheckForm = ({
  toggleVisibility,
  diagnosisCodesOption,
  description,
  setDescription,
  dateOfEntry,
  setDateOfEntry,
  specialist,
  setSpecialist,
  diagnosisCodes,
  submitNewEntry,
  onDiagnosisCodesChange,
}: Props) => {
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [hover, setHover] = useState<number>(-1);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewEntry({
      description,
      date: dateOfEntry,
      specialist,
      diagnosisCodes,
      type: Type.HealthCheck,
      healthCheckRating,
    });
  };

  return (
    <div>
      <Box
        sx={{
          paddingLeft: 2,
          border: "dashed",
          borderWidth: 1,
          marginBottom: 1,
        }}
      >
        <form onSubmit={addEntry}>
          <TextField
            label="description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date of entry"
            fullWidth
            value={dateOfEntry}
            type="date"
			InputLabelProps={{ shrink: true }}
            onChange={({ target }) => setDateOfEntry(target.value)}
          />
          <TextField
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }} id="HealthCheck Rating">
            HealthCheck Rating
          </InputLabel>
          <Rating
            name="simple-controlled"
            max={4}
            value={healthCheckRating + 1}
            onChange={(event, newValue) => {
              if (newValue) {
                setHealthCheckRating(newValue - 1);
              }
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {healthCheckRating !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : healthCheckRating + 1]}
            </Box>
          )}
          <InputLabel style={{ marginTop: 20 }} id="diagnosisCodes">
            Diagnosis codes
          </InputLabel>
          <Select
            labelId="diagnosisCodes"
            multiple
            fullWidth
            value={diagnosisCodes}
            input={<OutlinedInput label="Diagnosis Code" />}
            onChange={onDiagnosisCodesChange}
          >
            {diagnosisCodesOption.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={() => toggleVisibility()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default HealthCheckForm;
