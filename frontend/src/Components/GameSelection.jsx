import React, { useState, useEffect } from "react";
import api from "./api";

function GameSelection() {
  const [homeTeams, setHomeTeams] = useState([]);
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
  return <div></div>;
}

export default GameSelection;
