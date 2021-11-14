// Zookeeper API Endpoints.
const router = require("express").Router();
const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");

router.get("/zookeepers", function (request, response) {
    let results = zookeepers;
    if (request.query) {
        results = filterByQuery(request.query, results);
    }
    response.json(results);
});

router.get("/zookeepers/:id", function (request, response) {
    const result = findById(request.params.id, zookeepers);
    if (result) {
        response.json(result);
    } else {
        response.send(404);
    }
});

router.post("/zookeepers", function (request, response) {
    request.body.id = zookeepers.length.toString();

    if (!validateZookeeper(request.body)) {
        response.status(400).send("The zookeeper is not properly formatted.");
    } else {
        const zookeeper = createNewZookeeper(request.body, zookeepers);
        response.json(zookeeper);
    }
});

module.exports = router;