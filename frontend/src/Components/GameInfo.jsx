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
});

function WinPercentage(props) {
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
    <Grid item className={classes.winPercent}>
      {props.home_team} win {winPercentage}% of the time!
    </Grid>
  );
}

export default WinPercentage;
