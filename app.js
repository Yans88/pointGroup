'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const client = require('./connection');

// CORS CONFIG START //
app.use(cors());
app.options('*', cors());
// CORS CONFIG END //

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public', express.static(__dirname + '/public'));
app.use(errorHandler);

// IINTEGRATE FROM routes FOLDER
const aboutRoutes = require('./routes/about');
const adminRoutes = require('./routes/admins');
const eventRoutes = require('./routes/events');
const helpCenterRoutes = require('./routes/helpCenter');
const homeRoutes = require('./routes/home');
const memberRoutes = require('./routes/members');
const pointRoutes = require('./routes/points');
const serviceTransactionRoutes = require('./routes/serviceTransaction');

// INTEGRATE FROM FILE .env
const api = process.env.API_VERSION;

// ROUTERS
app.use(`${api}/about`, aboutRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/event`, eventRoutes);
app.use(`${api}/help-center`, helpCenterRoutes);
app.use(`${api}/home`, homeRoutes);
app.use(`${api}/member`, memberRoutes);
app.use(`${api}/point_history`, pointRoutes);
app.use(`${api}/service_transaction`, serviceTransactionRoutes);

// RUN SERVER AT PORT 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// CONNECT TO POSTGRESQL DATABASE
client.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Database Connected');
  }
});
