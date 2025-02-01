# pluto-data-takehome

#Docker Commands
Welcome to Tara's cricket website! See the instructions below to start up the web-app.

Made with love by Tara Lee.

#rebuild container after changes
`docker-compose up --build -d`

##stop container
`docker compose stop`

##start container
`docker compose start`

#Manual Start up
Have to change `DATABASE_URL` in `/backend/app/database.py` to "postgresql://taralee:user@localhost:5432/plutodb"

##start backend
`uvicorn app.main:app --reload`

##start frontend
`npm start`
