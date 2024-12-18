Not intended for wide reaching use.

# TODOs

- [X] Proper API Class (so we don't have many axios calls everywhere)
- [X] Secondary voting rounds
  - Take a trip and have it calculate the 2-3 top cabins and stage a second round of voting
- [ ] Make and actual "FinalRoundCabin" model for the final round voting
- [X] Proper env variables. Mainly just the URL endpoint that's hit
- [X] Better UI for the cards (bottom padding is missing)
- [X] Proper user support over some SSO would be great. Hell I'll take a username and password. Just something better than nothing
- [ ] Split these apart into separate repos
  - This isn't really needed since this is just a side project for fun so it's low priority. But proper project structures should really be followed
- [ ] Find a way to map out shortened URLs. VRBO's specific URL shortener doesn't work on mobile and forces users to download the app. They also don't work for image URLs
- [X] Standard the card sizes
  - Images vary in size and without set card dimensions, they can become ever so slightly bigger or smaller and it offsets the rows
- [X] Access control to Cabins and trips
  - needs proper user support
- [X] Pre-commit hooks for enforcing prettier code formatting
- [ ] More voting round support
  - This is one of those things that really should really on access controls. Let the "trip planner" dictate how many rounds and when to start and stop them. Letting just anyone who can access the UI do this is awful
- [ ] Deployments on Unraid are fine for my usage. But the lack of proper `.env` files makes it a tedious process to have niche changes to the docker compose file. It's annoying if nothing else
- [X] Automated builds and pushes to Dockerhub would be sweet
# Running the app

Documentation is written from a Windows development standpoint. Most commands translate across all platforms but with mildly different syntax:
> i.e Docker compose is `docker-compose` on Windows but `docker compose` on MacOS and Linux. When working in the containers, everything is Unix based

## Docker

### Api

Make sure docker is running and from the `cabin_site` project direcory, run `docker-compose up --build`

### Running the UI

From the `frontend` project directory, run `npm run start`

### Database

This is run alongside the Api in the docker-compose

## Without Docker

### Api

Make sure docker is running and from the `cabin_site` project direcory, run `python manage.py migrate && python manage.py runserver`

### Running the UI

From the `frontend` project directory, run `npm run start`

### Database

Unsure right now. Spin up a Postgres 14 container and map the network information?

# Deployment

There is a docker-compose yaml that'll build all 3 containers for the app. Unraid has community support for docker
compose. So I will attempt to use that.

## Building
`cd` into the `cabin_site` & `frontend` directories and build the respective Dockerfiles in there: `docker build -t my_docker_repo/my_app:<frontend/backend> .`. Push these two containers to the Dockerhub and deploy on Unraid

I now also have an automated script to build and publish the two docker images. Should work on any UNIX system with Zshell available.
