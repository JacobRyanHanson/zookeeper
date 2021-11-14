const { animals } = require("../../data/animals.json");
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals.js');
const router = require('express').Router();
// Query object useful for multifaceted operations.
router.get('/animals', function (request, response) {
    let results = animals;
    if (request.query) {
        results = filterByQuery(request.query, results);
    }
    response.json(results);
});
// Params object useful for retrieving individual records.
router.get('/animals/:id', function (request, response) {
    const result = findById(request.params.id, animals);
    if (result) {
        response.json(result);
    } else {
        response.send(404);
    }  
});

router.post('/animals', function (request, response) {
    request.body.id = animals.length.toString();
    if (!validateAnimal(request.body)) {
        response.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(request.body, animals);
        response.json(animal);
    }
});

module.exports = router;