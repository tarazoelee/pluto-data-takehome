# pluto-data-takehome

Welcome to Tara's cricket website! See the instructions below to start up the web-app.

## Docker Commands

Build and run container or rebuild after changes:
`docker-compose up --build -d`

Start container:
`docker compose start`

Stop containers:
`docker compose stop`

Remove containers and volumes:
`docker-compose down -v`

Access web-app at: `localhost:3000`

## Manual Start up

Change `DATABASE_URL` in `/backend/app/database.py` to `postgresql://taralee:user@localhost:5432/plutodb`

Start backend
`uvicorn app.main:app --reload`

Start frontend
`npm start`
