import React, { useState, useEffect } from "react";
import api from "../api";
import Grid from "@mui/material/Grid2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function GameSelection() {
  const [homeTeams, setHomeTeams] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchHomeTeams = async () => {
    try {
      const res = await api.get("/get_home_teams/");
      setHomeTeams(res.data);
    } catch (err) {
      console.error("Error getting teams");
    }
  };

  useEffect(() => {
    fetchHomeTeams();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Button variant="contained" onClick={handleClick}>
          Select Home Team
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {homeTeams.length > 0 ? (
            homeTeams.map((team, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {team}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Teams Available</MenuItem>
          )}
        </Menu>
      </Grid>
    </>
  );
}

export default GameSelection;
