const express = require("express");
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// Server setup.
const app = express();
// Middleware functions mounted to the server that requests must pass through before reaching an endpoint.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
    console.log('API server now on port ' + PORT);
});