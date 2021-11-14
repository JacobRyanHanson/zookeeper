const fs = require("fs");
const path = require("path");
// Returns an array of animal objects based on query parameters.
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    // If the personalityTraites attribute has only one value take the string and put it in an array use the array.
    // If the desired trait is found put it in the filtered array (results).
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
    // If the queried diet is not found remove corresponding animals from the filtered array.
    if (query.diet) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.diet === query.diet;
        });
    }
    // If the queried species is not found remove corresponding animals from the filtered array.
    if (query.species) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.species === query.species;
        });
    }
    // If the queried name is not found remove corresponding animals from the filtered array.
    if (query.name) {
        filteredResults = filteredResults.filter(function (animal) {
            return animal.name === query.name;
        });
    }
    return filteredResults;
}
// Matches a queried id to the id of an animal in the array.
function findById(id, animalsArray) {
    const result = animalsArray.filter(function (animal) {
        return animal.id === id;
    })[0];
    return result;
}
// Adds the animal to the array and updates animals.json. 
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}
// Validates user input.
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

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}