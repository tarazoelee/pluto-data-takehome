import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";
import Navbar from "./Components/Navbar";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1d2430",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Navbar></Navbar>
      </Grid>
    </>
  );
}

export default App;
