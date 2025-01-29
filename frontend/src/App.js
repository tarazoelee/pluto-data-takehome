import React from "react";
import Grid from "@mui/material/Grid2";
import Navbar from "./Components/Navbar";
import GameSelection from "./Components/GameSelection";

function App() {
  return (
    <Grid container justifyContent="center" alignItems={"center"}>
      <Navbar></Navbar>
      <GameSelection></GameSelection>
    </Grid>
  );
}

export default App;
