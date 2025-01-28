import React from "react";
import Grid from "@mui/material";

const Histogram = () => {
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography className={classes.title}>
            Cricket Game Analysis
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Pluto Data</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Histogram;
