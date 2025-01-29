import api from "../api";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import Histogram from "./Histogram";
import WinPercentage from "./WinPercentage";
import SelectField from "./SelectField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "100px 0px",
  },
});

function GameSelection() {
  const [homeTeams, setHomeTeams] = useState([]);
  const [awayTeams, setAwayTeams] = useState([]);
  const [gameDates, setGameDates] = useState([]);
  const [simulationResultsHome, setSimulationResultsHome] = useState([]);
  const [simulationResultsAway, setSimulationResultsAway] = useState([]);
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

  const fetchSimulationResults = async () => {
    try {
      const homeResults = await api.get(`/get_simulations/${selectedHomeTeam}`);
      setSimulationResultsHome(homeResults.data);

      const awayResults = await api.get(`/get_simulations/${selectedAwayTeam}`);
      setSimulationResultsAway(awayResults.data);
    } catch (err) {
      console.error("Error fetching simulation results:", err);
    }
  };

  useEffect(() => {
    fetchHomeTeams();
  }, []);

  //Fetch away teams when the home team is selected
  useEffect(() => {
    if (selectedHomeTeam) {
      fetchAwayTeams();
    }
  }, [selectedHomeTeam]);

  useEffect(() => {
    if (selectedHomeTeam && selectedAwayTeam) {
      fetchGameDates();
      fetchSimulationResults();
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
      <Grid
        item
        container
        spacing={8}
        direction={"column"}
        className={classes.root}
      >
        <Grid item container>
          <SelectField
            selectedTeam={selectedHomeTeam}
            handleSelectTeam={handleSelectHomeTeam}
            teamsList={homeTeams}
            inputLabel={"Home Teams"}
          ></SelectField>
          <SelectField
            selectedTeam={selectedAwayTeam}
            handleSelectTeam={handleSelectAwayTeam}
            teamsList={awayTeams}
            inputLabel={"Away Teams"}
          ></SelectField>
          <SelectField
            selectedTeam={selectedGameDate}
            handleSelectTeam={handleSelectGame}
            teamsList={gameDates}
            inputLabel={"Games"}
          ></SelectField>
        </Grid>
        {simulationResultsHome.length > 0 &&
          simulationResultsAway.length > 0 && (
            <Histogram
              simulationResultsHome={simulationResultsHome}
              simulationResultsAway={simulationResultsAway}
              homeTeam={selectedHomeTeam}
              awayTeam={selectedAwayTeam}
            />
          )}

        {selectedHomeTeam && selectedAwayTeam && (
          <WinPercentage
            home_team={selectedHomeTeam}
            away_team={selectedAwayTeam}
          />
        )}
      </Grid>
    </>
  );
}

export default GameSelection;
