import api from "../API";

//RIGHT NOW THIS HAS ALL THE API CALLS
//FIX: SEPERATE THEM INTO DIFF FILES
export async function getHomeTeams() {
  try {
    const res = await api.get("/home_teams/");
    return { success: true, res: res.data };
  } catch (err) {
    console.error("Error getting home teams", err);
    return { success: false, res: [] };
  }
}

export async function getAwayTeams(homeTeam) {
  try {
    const res = await api.get(`/away_teams/${homeTeam}`);
    return { success: true, res: res.data };
  } catch (err) {
    console.error("Error getting away teams", err);
    return { success: false, res: [] };
  }
}

export async function getGameDates(homeTeam, awayTeam) {
  try {
    const res = await api.get("/game_dates/", {
      params: { home_team: homeTeam, away_team: awayTeam },
    });
    return { success: true, res: res.data };
  } catch (err) {
    console.error("Error fetching game dates", err);
    return { success: false, res: [] };
  }
}

export async function getVenue(homeTeam, awayTeam, date) {
  try {
    const res = await api.get("/game_venue/", {
      params: { home_team: homeTeam, away_team: awayTeam, date: date },
    });
    console.log(res.data);
    return { success: true, res: res.data };
  } catch (err) {
    console.error("Error fetching game dates", err);
    return { success: false, res: [] };
  }
}

export async function getSimulationResults(team) {
  try {
    const res = await api.get(`/simulations/${team}`);
    return { success: true, res: res.data };
  } catch (err) {
    console.error("Error fetching simulation results", err);
    return { success: false, res: [] };
  }
}
