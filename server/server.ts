import * as express from "express";
import * as mongoose from 'mongoose';


import config =  require('./config/config');


// Global Vars

let app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/stackoverflowclone';

// mongoose connection
require('./api/questions/questions.model');
mongoose.connect(MONGO_URL, (err) => {
    if (err) console.error(err);
    else console.log(`Connected to ${MONGO_URL}`);
});

app.use(require("body-parser")())
// access bower_components via /scripts/...
app.use('/bower_components', express.static('bower_components'));
// access the client->app->home folder via /app/home
app.use('/client', express.static('client'));

app.get('/', (req, res, next) => {
  res.sendFile(config.client + '/index.html');
});

app.use('/api/v1/main', require('./api/questions/questions.routes'));

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

app.listen(3000, () => {
  console.log('Server is listening on localhost:3000');
});
