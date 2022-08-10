const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../model/model.js')
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('./googleclient.js')

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function (request, accessToken, refreshToken, profile, done) {
    console.log('acces', accessToken);
    console.log('refresh', refreshToken);
    console.log('profile', profile)
    const sqlAuth = `Temp String    `
    return done(err, profile)
    
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
  // passport.d

  //ya29.A0AVA9y1swyxp_A4NLi50qSLnuWMcbDeeQ7NSyqgllvY8k4YcEhYvRu2Q7ttV0y5h2xVZ3lvSyZotGlgsusfMk5wTbTXPmM89K6wlJvW9Vck5vFRiDH0BAm59Glr9nFRjvZxvEhkYp-s6amT4z5qT2szP-jJBtaCgYKATASATASFQE65dr82NsDIagmYtT5JvlmObirNA0163

  //http://localhost:3000/auth/google/callback?code=4%2F0AdQt8qj_h_CS3C2OXAHVRiWeY1gvjaqXiz2qRgd9kouYcj4B51x2Oo8gL8AlN2PD3ROsIQ&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent