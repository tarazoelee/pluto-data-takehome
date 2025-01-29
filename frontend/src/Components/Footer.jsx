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
    bottom: 0,
    fontWeight: 700,
  },
  text: {
    fontWeight: 900,
    fontSize: "26px",
    color: "#f6ae2d",
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" className={classes.root}>
        made by tara lee
      </Grid>
    </>
  );
}

export default Footer;
