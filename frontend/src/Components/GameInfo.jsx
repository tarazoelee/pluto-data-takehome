import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { getWinPercentage } from "../API/TeamAPI";

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

  useEffect(() => {
    const fetch_win_percentage = async () => {
      const winPercentage = await getWinPercentage(
        props.home_team,
        props.away_team
      );
      if (winPercentage.success) {
        setWinPercentage(winPercentage.res.win_percentage);
      }
    };
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
