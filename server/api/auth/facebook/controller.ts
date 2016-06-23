import * as express from "express";
import { User, IUserModel } from '../../users/users.model';

let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/facebook/callback",
    profileFields: ['id', 'name', 'emails'],
    passReqToCallback: true
  }, auth
  // function(accessToken, refreshToken, profile, cb) {
  //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //     return cb(err, user);
  //   });
  // }
));

export function auth(req, accessToken, refreshToken, profile, cb) {
	User.findOne({ facebookId: profile.id }).exec((err, user) => {
		if(err) return cb(err);
		if(user) {
			req['tempUser'] = user;
			return cb(null, user);
		} else {
			let u = new User();
			u.firstName = profile.name.givenName;
      u.lastName = profile.name.familyName;
      u.email = profile.emails[0].value;
			u.facebookId = profile.id;
			u.facebookToken = accessToken;
      console.log(profile);
			u.save((err, result) => {
				if (err) return cb(err);
				req['tempUser'] = result;
				cb(null, result);
			});
		}
	});
}

export function callback(req: express.Request, res: express.Response, next: Function) {
	res.redirect('/?code=' + req['tempUser'].createJWT());
}
