import React, { useState, useEffect } from "react";
import api from "../api";
import Grid from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  selectContainer: {
    width: 200,
  },
});

function GameSelection() {
  const [homeTeams, setHomeTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const classes = useStyles();

  const fetchHomeTeams = async () => {
    try {
      const res = await api.get("/get_home_teams/");
      setHomeTeams(res.data);
    } catch (err) {
      console.error("Error getting teams");
    }
  };

  useEffect(() => {
    fetchHomeTeams();
  }, []);

  const handleChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <FormControl className={classes.selectContainer} variant="filled">
          <InputLabel className={classes.inputLabel}>Home Team</InputLabel>
          <Select
            value={selectedTeam}
            onChange={handleChange}
            label="Select Home Team"
            className={classes.select}
          >
            {homeTeams.length > 0 ? (
              homeTeams.map((team, index) => (
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
    </>
  );
}

export default GameSelection;
