# Node App, MongoDB, Cocktail Recipes Based off Ingredients w/ Autocomplete

Tutorial
---------

[Docker compose : NodeJS with MongoDB](https://www.bogotobogo.com/DevOps/Docker/Docker-Compose-Node-MongoDB.php) 

start mongodb container first (not sure why this is needed but won't connect otherwise)

`docker-compose up -d`

`docker exec -it <mongodb> bash`

Move recipes.json into /data folder within the container

Run `mongoimport --db recipes --collection cocktails --drop --file recipes.json --jsonArray`