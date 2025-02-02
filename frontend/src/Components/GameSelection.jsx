import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import Histogram from "./Histogram";
import GameInfo from "./GameInfo";
import SelectField from "./SelectField";
import { makeStyles } from "@mui/styles";
import {
  getHomeTeams,
  getGameDates,
  getAwayTeams,
  getVenue,
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
  const [selectedHomeTeam, setHomeTeam] = useState("");
  const [selectedAwayTeam, setAwayTeam] = useState("");
  const [selectedGameDate, setGameDate] = useState("");
  const [selectedGameVenue, setGameVenue] = useState("");
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
      const getSimulationData = async () => {
        const gameData = await getGameDates(selectedHomeTeam, selectedAwayTeam);
        if (gameData.success) {
          setGameDates(gameData.res);
        }
      };
      getSimulationData();
    }
  }, [selectedHomeTeam, selectedAwayTeam]);

  useEffect(() => {
    if (selectedHomeTeam && selectedAwayTeam && selectedGameDate) {
      const fetchGameVenue = async () => {
        const gameVenue = await getVenue(
          selectedHomeTeam,
          selectedAwayTeam,
          selectedGameDate
        );
        if (gameVenue.success) {
          console.log(gameVenue.res);
          setGameVenue(gameVenue.res.venue_name);
        }
      };
      fetchGameVenue();
    }
  }, [selectedGameDate]);

  const handleSelectHomeTeam = (event) => {
    setHomeTeam(event.target.value);
    setAwayTeam("");
    setGameDates([]);
    setGameDate("");
    setGameVenue("");
  };

  const handleSelectAwayTeam = (event) => {
    setAwayTeam(event.target.value);
    setGameVenue("");
  };

  const handleSelectGameDate = (event) => {
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
            handleSelectTeam={handleSelectGameDate}
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
          {/* Once the teams are selected we can display graph and  win percentages */}
          {selectedHomeTeam && selectedAwayTeam && (
            <>
              <Histogram
                homeTeam={selectedHomeTeam}
                awayTeam={selectedAwayTeam}
              />
              <GameInfo
                home_team={selectedHomeTeam}
                away_team={selectedAwayTeam}
                venue={selectedGameVenue}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default GameSelection;
