from app import models
from app.database import engine, SessionLocal
from app.models import Venue, Game, Simulation
from app.routes import router

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import uvicorn

from typing import Annotated
from sqlalchemy.orm import Session

import psycopg2

app = FastAPI()

origins=["http://localhost:3000"]

app.add_middleware(CORSMiddleware, allow_origins=origins,allow_credentials=True,allow_methods=["*"], allow_headers=["*"])

#creating db tables on start
@app.on_event("startup")
def startup():
    models.Base.metadata.create_all(bind=engine)
    app.include_router(router)

#trying to open or close db 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/upload_venues/")
def upload_venues(db: db_dependency):
    try:
        venues_df = pd.read_csv("app/data/venues.csv")
        for _, row in venues_df.iterrows():
            venue = Venue(venue_id=row["venue_id"], venue_name=row["venue_name"])
            db.add(venue)

        db.commit()
        return {"message": "venue CSV data uploaded successfully"}

    except Exception as e:
        db.rollback() 
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload_games/")
def upload_games(db: db_dependency):
    try:
        games_df = pd.read_csv("app/data/games.csv")
        game_id = 0
        for _, row in games_df.iterrows():

            game = Game(
                id=game_id,
                home_team=row["home_team"],
                away_team=row["away_team"],
                date=pd.to_datetime(row["date"]).date(),
                venue_id=int(row["venue_id"])
            )
            db.add(game)
            game_id+=1

        db.commit()
        return {"message": "venue CSV data uploaded successfully"}

    except Exception as e:
        db.rollback() 
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload_simulations/")
def upload_simulations(db: db_dependency):
    try:
        simulations_df = pd.read_csv("app/data/simulations.csv")
        sim_id = 0
        for _, row in simulations_df.iterrows():
            simulation = Simulation(
                id=sim_id,
                team_id=row["team_id"],
                team=row["team"],
                simulation_run=row["simulation_run"],
                results=row["results"]
            )
            db.add(simulation)
            sim_id += 1
        db.commit()
        return {"message": "simulation CSV data uploaded successfully"}

    except Exception as e:
        db.rollback() 
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)