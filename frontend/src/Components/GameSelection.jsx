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
  const [gameDates, setGameDates] = useState([]);
  const [selectedHomeTeam, setHomeTeam] = useState("");
  const [selectedAwayTeam, setAwayTeam] = useState("");
  const [selectedGameDate, setGameDate] = useState("");
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

  const fetchGameDates = async () => {
    try {
      const res = await api.get("/get_game_dates/", {
        params: {
          home_team: selectedHomeTeam,
          away_team: selectedAwayTeam,
        },
      });
      setGameDates(res.data);
    } catch (err) {
      console.error("Error fetching game dates:", err);
    }
  };

  useEffect(() => {
    fetchHomeTeams();
  }, []);

  // Fetch away teams when the home team is selected
  useEffect(() => {
    if (selectedHomeTeam) {
      fetchAwayTeams();
    }
  }, [selectedHomeTeam]);

  useEffect(() => {
    if (selectedHomeTeam && selectedAwayTeam) {
      fetchGameDates();
    }
  }, [selectedHomeTeam, selectedAwayTeam]);

  const handleSelectHomeTeam = (event) => {
    setHomeTeam(event.target.value);
  };

  const handleSelectAwayTeam = (event) => {
    setAwayTeam(event.target.value);
  };

  const handleSelectGame = (event) => {
    setGameDate(event.target.value);
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
            <InputLabel className={classes.inputLabel}>Games</InputLabel>
            <Select
              value={selectedAwayTeam}
              onChange={handleSelectAwayTeam}
              label="select away team"
              className={classes.select}
            >
              {awayTeams.length > 0 ? (
                awayTeams.map((date, index) => (
                  <MenuItem key={index} value={date}>
                    {date}
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
              value={selectedGameDate}
              onChange={handleSelectGame}
              label="select away team"
              className={classes.select}
            >
              {gameDates.length > 0 ? (
                gameDates.map((team, index) => (
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
