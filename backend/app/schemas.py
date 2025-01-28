from pydantic import BaseModel

class Venue(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class Game(BaseModel):
    id: int
    home_team: str
    away_team: str
    venue_id: int

    class Config:
        orm_mode = True
