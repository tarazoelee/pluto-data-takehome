import csv
from app.database import SessionLocal
from app.models import Venue, Game, Simulation

def load_data():
    db = SessionLocal()
    
    with open("backend/data/venues.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            venue = Venue(id=int(row["id"]), name=row["name"])
            db.merge(venue)
    
    with open("backend/data/games.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            game = Game(
                id=int(row["id"]),
                home_team=row["home_team"],
                away_team=row["away_team"],
                venue_id=int(row["venue_id"]),
            )
            db.merge(game)
    
    with open("backend/data/simulations.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            simulation = Simulation(
                id=int(row["id"]),
                game_id=int(row["game_id"]),
                home_team_runs=int(row["home_team_runs"]),
                away_team_runs=int(row["away_team_runs"]),
            )
            db.merge(simulation)
    
    db.commit()
    db.close()
