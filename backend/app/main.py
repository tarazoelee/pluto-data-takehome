# import csv
from fastapi import FastAPI, HTTPException, Depends
from app.database import engine, SessionLocal
from pydantic import BaseModel
from typing import List, Annotated
from sqlalchemy.orm import Session
from app import models
import psycopg2

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class VenueType(BaseModel):
    id: int
    name: str

#trying to open or close db 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/questions/")
async def create_venues(venue: VenueType, db: db_dependency):
    db_venue = models.Venue(venue_text = venue.venue_text)
    db.add(db_venue)
    db.commit()
    db.refresh(db_venue)
