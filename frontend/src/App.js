import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  title: {
    color: "black",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item className={classes.title}>
          <Typography>Cricket Game Analysis</Typography>
        </Grid>
        <Grid item>
          <Typography>Pluto Data</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
