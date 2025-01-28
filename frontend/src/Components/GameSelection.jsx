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
  const [awayTeams, setAwayTeams] = useState([]);
  const [selectedHomeTeam, setHomeTeam] = useState("");
  const [selectedAwayTeam, setAwayTeam] = useState("");
  const classes = useStyles();

  const fetchHomeTeams = async () => {
    try {
      const res = await api.get("/get_home_teams/");
      setHomeTeams(res.data);
    } catch (err) {
      console.error("Error getting teams");
    }
  };

  const fetchAwayTeams = async () => {
    try {
      const res = await api.get(`/get_away_teams/${selectedHomeTeam}`);
      setAwayTeams(res.data);
    } catch (err) {
      console.error("Error getting teams");
    }
  };

  useEffect(() => {
    fetchHomeTeams();
  }, []);

  // Only fetch away teams if a home team is selected
  useEffect(() => {
    if (selectedHomeTeam) {
      fetchAwayTeams();
    }
  }, [selectedHomeTeam]);

  const handleSelectHomeTeam = (event) => {
    setHomeTeam(event.target.value);
  };

  const handleSelectAwayTeam = (event) => {
    setAwayTeam(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Home Team</InputLabel>
            <Select
              value={selectedHomeTeam}
              onChange={handleSelectHomeTeam}
              label="Select Home Team 1"
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

        <Grid item>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Away Team</InputLabel>
            <Select
              value={selectedAwayTeam}
              onChange={handleSelectAwayTeam}
              label="select away team"
              className={classes.select}
            >
              {awayTeams.length > 0 ? (
                awayTeams.map((team, index) => (
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
      </Grid>
    </>
  );
}

export default GameSelection;
