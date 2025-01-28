from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import Game, Venue, Simulation
from sqlalchemy.orm import Session
from typing import Annotated

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

#TEAM INFO
@router.get("/get_home_teams/")
def get_home_teams(db: db_dependency):
    home_teams = db.query(Game.home_team).distinct().all()
    return [team[0] for team in home_teams] 

@router.get("/get_away_teams/{home_team}")
def get_away_teams(home_team: str, db: db_dependency):
    away_teams = db.query(Game.away_team).filter(Game.home_team == home_team).distinct().all()
    if not away_teams:
        raise HTTPException(status_code=404, detail=f"No away teams found for home team {home_team}")
    return [team[0] for team in away_teams]


#GAME INFO 
@router.get("/get_game_dates/")
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

@router.get("/get_game_venue/")
def get_game_venue(home_team: str, away_team: str, date: str, db: db_dependency):
    game = db.query(Game).filter(
        Game.home_team == home_team,
        Game.away_team == away_team,
        Game.date == date
    ).first()
    if not game:
        raise HTTPException(
            status_code=404,
            detail=f"No game found for home team {home_team}, away team {away_team}, and date {date}"
        )
    venue = db.query(Venue).filter(Venue.venue_id == game.venue_id).first()
    if not venue:
        raise HTTPException(
            status_code=404,
            detail=f"Venue not found for game {game.id}"
        )
    return {
        "venue_id": venue.venue_id,
        "venue_name": venue.venue_name
    }

@router.get("/get_simulations/{team_name}")
def get_simulations(team_name: str, db: db_dependency):
    simulations = db.query(Simulation).filter(Simulation.team == team_name).all()

    if not simulations:
        raise HTTPException(
            status_code=404,
            detail=f"No simulations found for team '{team_name}'"
        )

    response = [
        {"simulation_run": sim.simulation_run, "results": sim.results}
        for sim in simulations
    ]

    return response


