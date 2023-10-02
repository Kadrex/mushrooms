# Mushrooms

## Tech info
Ports used:
* 5432 for database
* 4200 for frontend
* 8080 for backend

## Running in Docker
* Clone the repository.
* Navigate to the root of the project (/mushrooms)
* Run ```docker-compose build && docker-compose up -d```
* Wait a little and open http://localhost:4200


## Alternatively, run frontend and backend yourself

### Frontend
* Ensure that port 4200 is available.
* Navigate to frontend directory (mushrooms-ui).
* Install the node modules: ```npm i```.
* Start the application: ```ng serve```.
* Open http://localhost:4200.

### Database
* Ensure that your Docker is running.
* Ensure that port 5432 is available.
* Run ```docker-compose up -d``` in directory root.
* Wait a little.
* (The SQL script for creating table is in mushrooms-app/src/main/resources/schema.sql)

### Backend
* Ensure that port 8080 is available.
* Make sure that maven dependencies are loaded and project built.
* Run the MushroomAppApplication.


#### Adjustments
You can change any of the ports, if needed.  
Note that you must change them in all places (in frontend: configuration/configuration.service.ts, in backend: application.properties).  
For database: docker-compose.yml file and application.properties in backend.

#### Side note
Please don't make too many requests to the water-api, since it will "stop working" when a limit is exceeded.
Too many would be 90+.
