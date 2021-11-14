const path = require('path');
const router = require('express').Router();
// Homepage.
router.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', function (request, response) {
    response.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', function (request, response) {
    response.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
// Wildcard Route redirects user to homepage if none of the above routes were selected.
router.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;