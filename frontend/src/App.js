import React from "react";
import Grid from "@mui/material/Grid2";
import Navbar from "./Components/Navbar";
import GameSelection from "./Components/GameSelection";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Arsenal', sans-serif",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems={"center"}
      className={classes.root}
    >
      <Navbar></Navbar>
      <GameSelection></GameSelection>
    </Grid>
  );
}

export default App;
