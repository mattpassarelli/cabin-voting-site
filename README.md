Not intended for wide reaching use.

# Running the app

## Docker

### Api

Make sure docker is running and from the `cabin_site` project direcory, run `docker-compose up --build`

### Running the UI

From the `frontend` project directory, run `npm run start`

### Database

This is run alongside the Api in the docker-compose

## Without Docker

### Api

Make sure docker is running and from the `cabin_site` project direcory, run `python manage.py runserver`

### Running the UI

From the `frontend` project directory, run `npm run start`

### Database

Unsure right now. Spin up a Postgres 14 container and map the network information?

# Deployment

TBD
