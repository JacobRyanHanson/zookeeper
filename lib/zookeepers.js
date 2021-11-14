const fs = require("fs");
const path = require("path");
// Returns an array of zookeeper objects based on query parameters.
function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    // If the age does not match remove the zookeeper from the filtered array.
    if (query.age) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    // If the favorite animal does not match remove the zookeeper from the filtered array.
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    // If the name does not match remove the zookeeper from the filtered array.
    if (query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filteredResults;
}
// Matches a queried id to the id of an zookeeper in the array.
function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}
// Adds the zookeeper to the array and updates zookeepers.json. 
function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({ zookeepers }, null, 2)
    );
    return zookeeper;
}
// Validates the user input.
function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
}