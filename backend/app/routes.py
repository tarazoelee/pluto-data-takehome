from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import Game, Venue, Simulation
from sqlalchemy.orm import Session
from typing import Annotated

router = APIRouter()

#Connecting to db session 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

#TEAM INFO
@router.get("/home_teams/")
def get_home_teams(db: db_dependency):
    home_teams = db.query(Game.home_team).distinct().all()
    return [team[0] for team in home_teams] 

@router.get("/away_teams/{home_team}")
def get_away_teams(home_team: str, db: db_dependency):
    away_teams = db.query(Game.away_team).filter(Game.home_team == home_team).distinct().all()
    if not away_teams:
        raise HTTPException(status_code=404, detail=f"No away teams found for home team {home_team}")
    return [team[0] for team in away_teams]


#GAME INFO 
@router.get("/game_dates/")
def get_game_dates(home_team: str, away_team: str, db: db_dependency):
    game_dates = db.query(Game.date).filter(
        Game.home_team == home_team,
        Game.away_team == away_team
    ).distinct().all()
    if not game_dates:
        raise HTTPException(
            status_code=404,
            detail=f"No game dates found for home team {home_team} and away team {away_team}"
        )
    return [date[0] for date in game_dates]


@router.get("/game_venue/")
def get_game_venue(home_team: str, away_team: str, date: str, db: db_dependency):
    # Query to find the venue_id based on the teams and date
    game_venue = db.query(Game.venue_id).filter(
        Game.home_team == home_team,
        Game.away_team == away_team,
        Game.date == date
    ).first()

    if not game_venue:
        raise HTTPException(
            status_code=404,
            detail=f"No game found for home team {home_team}, away team {away_team}, and date {date}"
        )
    
    venue_id = game_venue[0]

    venue = db.query(Venue.venue_name).filter(Venue.venue_id == venue_id).first()
    
    if not venue:
        raise HTTPException(
            status_code=404,
            detail=f"Venue not found for game with venue_id {venue_id}"
        )
    return {
        "venue_name": venue[0]
    }


#SIMULATION DATA 
@router.get("/simulations/{team_name}")
def get_simulations(team_name: str, db: db_dependency):
    simulation_results = db.query(Simulation.results).filter(Simulation.team == team_name).all()

    if not simulation_results:
        raise HTTPException(
            status_code=404,
            detail=f"No simulations found for team '{team_name}'"
        )

    response = [sim_result[0] for sim_result in simulation_results]
    return response


@router.get("/win_percentage/")
def get_win_percentage(
    home_team: str, 
    away_team: str, 
    db: Session = Depends(get_db)
):
    home_results = get_simulations(home_team, db)
    away_results = get_simulations(away_team, db)

    if not home_results or not away_results:
        raise HTTPException(
            status_code=404,
            detail=f"Simulations not found for one or both teams: {home_team}, {away_team}"
        )

    if len(home_results) != len(away_results):
        raise HTTPException(
            status_code=400,
            detail=f"Mismatch in the number of simulations for {home_team} and {away_team}."
        )
    home_wins = sum(1 for home, away in zip(home_results, away_results) if home > away)
    total_simulations = len(home_results)

    home_win_percentage = (home_wins / total_simulations) * 100 if total_simulations > 0 else 0

    rounded_win_percentage = round(home_win_percentage, 2)

    return {
        "win_percentage": rounded_win_percentage
    }
