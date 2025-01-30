import React from "react";
import Grid from "@mui/material/Grid2";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "30px 80px",
    backgroundColor: "#edf1f7",
    width: "100vw",
    maxHeight: "150px",
    position: "absolute",
    top: 0,
  },
  title: {
    fontWeight: 900,
    fontSize: "26px",
    color: "#f6ae2d",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: 900,
    color: "#86bbd8",
  },
});

function Navbar() {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" className={classes.root}>
        <Grid className={classes.title}>Cricket Game Analysis</Grid>
        <Grid className={classes.subTitle}>Pluto Data Analytics</Grid>
      </Grid>
    </>
  );
}

export default Navbar;
