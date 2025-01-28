import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "100px",
  },
  title: {
    fontWeight: 700,
    fontSize: "24px",
  },
  subTitle: {
    fontSize: "22px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid className={classes.title}>Cricket Game Analysis</Grid>
        <Grid item className={classes.subTitle}>
          Pluto Data
        </Grid>
      </Grid>
    </>
  );
}

export default App;
