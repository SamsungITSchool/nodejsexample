#!/usr/bin/env bash

# Create WC
curl -H "Content-Type: application/json" -X POST -d '{
  "description": "Паркова рядом с МГУ, есть стальные рамы и навес",
  "findDescription": "Рядом с памятником Ломоносову",
  "latitude": 47.12312,
  "longitude": 57.53453
}' http://localhost:3000/bicycle

# Update WC
curl -H "Content-Type: application/json" -X POST -d '{
  "id": 123,
  "description": "Паркова рядом с МГУ, есть стальные рамы и навес",
  "findDescription": "Рядом с памятником Ломоносову",
  "latitude": 47.12312,
  "longitude": 57.53453
}' http://quiet-spire-6100.herokuapp.com/bicycle/123

# Get nearest
curl -H "Content-Type: application/json" -X GET http://localhost:3000/bicycle/55.752220/37.615555