import * as express from 'express';
import * as controller from './controller';

let passport = require('passport');
const router = express.Router();

router.get("/auth", passport.authenticate('facebook'));
router.get('/callback', passport.authenticate('facebook'), controller.callback)

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export = router;
