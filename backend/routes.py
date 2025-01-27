from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import Game, Simulation
from sqlalchemy.orm import joinedload

router = APIRouter()

@router.get("/games")
def get_games():
    db = SessionLocal()
    games = db.query(Game).options(joinedload(Game.venue)).all()
    return games

@router.get("/games/{game_id}")
def get_game_details(game_id: int):
    db = SessionLocal()
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    simulations = db.query(Simulation).filter(Simulation.game_id == game_id).all()
    home_wins = sum(1 for sim in simulations if sim.home_team_runs > sim.away_team_runs)
    total_simulations = len(simulations)
    win_percentage = (home_wins / total_simulations) * 100 if total_simulations > 0 else 0

    return {
        "game": game,
        "simulations": simulations,
        "win_percentage": win_percentage
    }
