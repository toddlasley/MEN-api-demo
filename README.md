# MEN-api-demo
Demo API built with MongoDB, Express.js, and Node.js.

Install Node.js:
https://nodejs.org/en/download/

Install MongoDB:
https://www.mongodb.com/download-center#community

Navigate to the root of the project folder (~\MEN-api-demo) and use the following command to
install all of the necessary Node packages:
```
npm install
```

With MongoDB running, execute the following:
```
mongo localhost:27017/admin <path to add-admin.js>
mongo localhost:27017/test <path to add-user.js>
mongoimport --db test --collection pokemon --drop --jsonArray --file <path to pokemon.json>
```

Run the app from the root directory with the following:
```
node app.js
```

Download Postman and test the endpoints with the following:

## Getting Pokemon
```
GET: localhost:8080/pokemon
```
will return all Pokemon in the database

```
GET: localhost:8080/pokemon?name=Pikachu
```
will return Pokemon by name

```
GET: localhost:8080/pokemon?type=Electric
```
will return all Pokemon of a certain type

## Adding Pokemon
```
PUT: localhost:8080/pokemon
```
with JSON in the request body that is consistent with the following:
```JSON
{
    "name": "Gyarados",
    "description": "When Magikarp evolves into Gyarados, its brain cells undergo a structural transformation. It is said that this transformation is to blame for this Pokémon's wildly violent nature.",
    "type": ["Water", "Flying"],
    "height": 256, //in inches
    "weight": 518.1 //in pounds
}
```

## Removing Pokemon
```
DELETE: localhost:8080/pokemon
```
with JSON in the request body that is consistent with the following:
```JSON
{
    "id": "id for given pokemon"
}
```