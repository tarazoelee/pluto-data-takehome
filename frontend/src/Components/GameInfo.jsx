import api from "../API";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles({
  winPercent: {
    fontSize: "22px",
    color: "white",
    fontWeight: 900,
    textAlign: "center",
  },
  gameInfo: {
    margin: "10px 0px 10px 0px",
    fontSize: "14px",
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
});

function GameInfo(props) {
  const classes = useStyles();
  const [winPercentage, setWinPercentage] = useState("");

  const fetch_win_percentage = async () => {
    try {
      const res = await api.get("/get_win_percentage/", {
        params: {
          home_team: props.home_team,
          away_team: props.away_team,
        },
      });
      setWinPercentage(res.data.win_percentage);
    } catch (err) {
      console.error("Error getting win percentage");
    }
  };

  useEffect(() => {
    fetch_win_percentage();
  }, [props]);

  return (
    <Grid item container direction="column">
      <Grid className={classes.gameInfo}>
        {props.home_team} vs. {props.away_team}
        {props.venue && ` at ${props.venue}`}
      </Grid>
      <Grid className={classes.winPercent}>
        {props.home_team} win {winPercentage}% of the time!
      </Grid>
    </Grid>
  );
}

export default GameInfo;
