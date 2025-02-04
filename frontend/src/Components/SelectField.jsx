import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";

const useStyles = makeStyles({
  select: {
    width: 200,
    border: "white",
    "&.MuiSelect-root": {
      color: "white",
    },
    "&.MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        color: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
});

function SelectField(props) {
  const classes = useStyles();
  return (
    <Grid item>
      <FormControl fullWidth>
        <InputLabel style={{ color: "#fff" }}>{props.inputLabel}</InputLabel>
        <Select
          value={props.selectedTeam}
          onChange={props.handleSelectTeam}
          label="Select Home Team 1"
          className={classes.select}
        >
          {props.teamsList.length > 0 ? (
            props.teamsList.map((team, index) => (
              <MenuItem key={index} value={team}>
                {team}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Teams Available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default SelectField;
