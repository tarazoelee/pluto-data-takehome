from fastapi import FastAPI
from app.routers import router
from app.database import engine, Base
from app.load_data import load_data

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.on_event("startup")
async def startup_event():
    load_data()

app.include_router(router)
