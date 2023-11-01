import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { EntryWithoutId, Type } from "../../types";

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

const OccupationalHealthcareForm = ({
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
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    submitNewEntry({
      description,
      date: dateOfEntry,
      specialist,
      diagnosisCodes,
      type: Type.OccupationalHealthcare,
      employerName,
      sickLeave: { startDate, endDate },
    });
  };

  return (
    <div>
      <Box
        sx={{
          padding: 5,
          border: "dashed",
          borderWidth: 1,
          marginBottom: 5,
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
          <TextField
            label="employerName"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel style={{ marginTop: 20 }} id="sickLeave">
            sick leave
          </InputLabel>
          <TextField
            label="startDate"
            type="date"
            sx={{ width: "75%" }}
            value={startDate}
			InputLabelProps={{ shrink: true }}
            onChange={({ target }) => setStartDate(target.value)}
          />
          <TextField
            label="endDate"
            type="date"
            sx={{ width: "75%" }}
            value={endDate}
			InputLabelProps={{ shrink: true }}
            onChange={({ target }) => setEndDate(target.value)}
          />
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

export default OccupationalHealthcareForm;
