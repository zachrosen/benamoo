import * as express from "express";

let app = express();
import config =  require('./config/config');

app.use(require("body-parser")())
// access bower_components via /scripts/...
app.use('/bower_components', express.static('bower_components'));
// access the client->app->home folder via /app/home
app.use('/client', express.static('client'));

app.get('/', (req, res, next) => {
  res.sendFile(config.client + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is listening on localhost:3000');
});
