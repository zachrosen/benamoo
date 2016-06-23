import * as express from 'express';
import * as controller from './controller';

let passport = require('passport');
const router = express.Router();

router.get("/auth", passport.authenticate('facebook'));
router.get('/callback', passport.authenticate('facebook'), controller.callback)

export = router;
