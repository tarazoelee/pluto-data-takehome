import React from "react";
import Grid from "@mui/material/Grid2";
import Navbar from "./Components/Navbar";
import GameSelection from "./Components/GameSelection";
import { makeStyles } from "@mui/styles";
import Footer from "./Components/Footer";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Arsenal', sans-serif",
    display: "flex", // Enable flexbox
    minHeight: "100vh",
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
      <Footer></Footer>
    </Grid>
  );
}

export default App;
