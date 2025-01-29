import React, { useState, useEffect } from "react";
import api from "../api";
import { number } from "mathjs";

function WinPercentage(props) {
  const [winPercentage, setWinPercentage] = useState(number);

  const fetch_win_percentage = async () => {
    try {
      const res = await api.get("/get_win_percentage/", {
        params: {
          home_team: props.home_team,
          away_team: props.away_team,
        },
      });
      setWinPercentage(res.data);
    } catch (err) {
      console.error("Error getting win percentage");
    }
  };

  useEffect(() => {
    fetch_win_percentage();
  }, [winPercentage]);
  return <div>winPercentage</div>;
}

export default WinPercentage;
