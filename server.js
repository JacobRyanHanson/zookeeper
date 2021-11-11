const express = require("express");
const { animals } = require("./data/animals.json")
// Server setup.
const app = express();

app.listen(3001, function () {
    console.log('API server now on port 3001');
});

app.get('/api/animals', function (request, response) {
    let results = animals;
    if (request.query) {
        results = filterByQuery(request.query, results);
    }
    response.json(results);
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
            }
            );
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
