import csv
from fastapi import FastAPI, Depends
from .database import init_db, SessionLocal
from .models import Venue, Game, Simulation

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    init_db()
    db = SessionLocal()

    with open("data/venues.csv", "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            db.add(Venue(id=row["id"], name=row["name"]))
    
    with open("data/games.csv", "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            db.add(Game(id=row["id"], home_team=row["home_team"],
                        away_team=row["away_team"], venue_id=row["venue_id"]))
    
    with open("data/simulations.csv", "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            db.add(Simulation(id=row["id"], game_id=row["game_id"], runs=row["runs"]))

    db.commit()
