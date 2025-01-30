import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import Histogram from "./Histogram";
import WinPercentage from "./WinPercentage";
import SelectField from "./SelectField";
import { makeStyles } from "@mui/styles";
import {
  getHomeTeams,
  getGameDates,
  getAwayTeams,
  getSimulationResults,
} from "../API/TeamAPI";

const useStyles = makeStyles({
  root: {
    padding: "50px 0px",
    alignItems: "center",
  },
  histogramContainer: {
    height: "400px",
    width: "900px",
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

  useEffect(() => {
    const fetchTeams = async () => {
      const teamData = await getHomeTeams();
      if (teamData.success) {
        setHomeTeams(teamData.res);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedHomeTeam) {
      const fetchAwayTeamsData = async () => {
        const awayData = await getAwayTeams(selectedHomeTeam);
        if (awayData.success) {
          setAwayTeams(awayData.res);
        }
      };
      fetchAwayTeamsData();
    }
  }, [selectedHomeTeam]);

  useEffect(() => {
    if (selectedHomeTeam && selectedAwayTeam) {
      const fetchGameData = async () => {
        const gameData = await getGameDates(selectedHomeTeam, selectedAwayTeam);
        if (gameData.success) {
          setGameDates(gameData.res);
        }
        const simulationHome = await getSimulationResults(selectedHomeTeam);
        if (simulationHome.success) {
          setSimulationResultsHome(simulationHome.res);
        }
        const simulationAway = await getSimulationResults(selectedAwayTeam);
        if (simulationAway.success) {
          setSimulationResultsAway(simulationAway.res);
        }
      };
      fetchGameData();
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
        spacing={4}
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
        <Grid
          item
          container
          className={classes.histogramContainer}
          justifyContent={"center"}
        >
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
      </Grid>
    </>
  );
}

export default GameSelection;
