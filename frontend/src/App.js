import React from "react";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import Navbar from "./Components/Navbar";
import GameSelection from "./Components/GameSelection";

const useStyles = makeStyles({
  root: {},
  content: {
    padding: "100px 200px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Navbar></Navbar>
      <Grid className={classes.content}>
        <GameSelection></GameSelection>
      </Grid>
    </Grid>
  );
}

export default App;
