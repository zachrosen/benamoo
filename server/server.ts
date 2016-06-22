require('dotenv').config({ silent: true });
// Imports
import * as express from 'express';
import * as mongoose from 'mongoose';
// use this way of importing because we said export = { } on the config.ts
import config = require('./config/config');

// Global Vars
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/stackoverflowclone';

// mongoose connection
//require('./api/pets/pet.model');
require('./api/users/users.model');
mongoose.connect(MONGO_URL, (err) => {
    if (err) console.error(err);
    else console.log(`Connected to ${MONGO_URL}`);
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Routes Config
app.use(require('body-parser')());
app.use('/client', express.static('client'));
app.use('/bower_components', express.static('bower_components'));
app.use(passport.initialize());

// Routes
app.get('/', (req, res, next) => {
    res.sendFile(config.client + '/index.html');
});

app.use('/api/v1/auth', require('./api/auth/facebook/routes'));
app.use('/api/v1/users', require('./api/users/users.routes'));

// if path starts with /client, /bower_components, or /api, send a 404
app.get(/\/(client|bower_components|api).{0,}/, (req, res, next) => {
    next({ status: 404, message: `${req.path} is not found, or does not exist. Please check for typos.` });
});

// all other get calls, ex: /adopt, send the index.html and let angular take care of the routing
app.get('/*', (req, res, next) => {
    res.sendFile(config.client + '/index.html');
});

app.use((req, res, next) => {
    return next({ status: 404, message: `${req.method}: ${req.path} is not found.` });
});

app.use((err: any, req, res, next) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production')
        console.log(err);
    if (process.env.NODE_ENV === 'production')
      err = { status: err.status || 500, message: err.message || '' };
    res.status(err.status).send(err);
});

// Listen
app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});
