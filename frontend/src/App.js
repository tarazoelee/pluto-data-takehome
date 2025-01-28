import "./App.css";
import api from "./api";
import React, { useEffect, useState } from "react";

function App() {
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

  return <div className="App">{homeTeams}</div>;
}

export default App;
