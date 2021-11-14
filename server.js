const express = require("express");
const { animals } = require("./data/animals.json");
const fs = require('fs');
const path = require('path');
// Server setup.
const app = express();
// Middleware functions mounted to the server that requests must pass through before reaching an endpoint.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

const PORT = process.env.PORT || 3001
// Homepage.
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', function (request, response) {
    response.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', function (request, response) {
    response.sendFile(path.join(__dirname, './public/zookeepers.html'));
});
// Query object useful for multifaceted operations.
app.get('/api/animals', function (request, response) {
    let results = animals;
    if (request.query) {
        results = filterByQuery(request.query, results);
    }
    response.json(results);
});
// Params object useful for retrieving individual records.
app.get('/api/animals/:id', function (request, response) {
    const result = findById(request.params.id, animals);
    if (result) {
        response.json(result);
    } else {
        response.send(404);
    }  
});
// Wildcard Route redirects user to homepage if none of the above routes were selected.
app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/animals', function (request, response) {
    request.body.id = animals.length.toString();
    if (!validateAnimal(request.body)) {
        response.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(request.body, animals);
        response.json(animal);
    }
});

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(function (trait) {
            filteredResults = filteredResults.filter(function (animal) {
                return animal.personalityTraits.indexOf(trait) !== -1;
            });
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.diet === query.diet;
        });
    }
    if (query.species) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.species === query.species;
        });
    }
    if (query.name) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.name === query.name;
        });
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(function (animal) {
        return animal.id === id;
    })[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
}

app.listen(PORT, function () {
    console.log('API server now on port ' + PORT);
});