// Router hub for all defined api routes (.js files in same directory).
const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes.js');
const zookeeperRoutes = require('./zookeeperRoutes');

router.use(animalRoutes);
router.use(zookeeperRoutes);

module.exports = router;