from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#connecting to plutodb
DATABASE_URL = "postgresql://postgres:user@localhost:5433/plutodb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# def init_db():
#     from .models import Venue, Game, Simulation
#     Base.metadata.create_all(bind=engine)

