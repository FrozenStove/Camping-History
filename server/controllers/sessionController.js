const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  // check if req includes cookies and whether there exists an ACTIVE session with that cookies id
  console.log('isLoggedIn Entered')
  // console.log(Object.keys(req))
  // console.log(req.cookies);
  // this cookie MUST be parsed before it works, check the beginning of server.js
  const ssid = req.cookies.ssid;
  // console.log('Cookie Request', ssid)
  Session.find({ cookieId: ssid }).exec()
    .then((response) => {
      console.log(response);
      if (response.length === 1) {
        // if so, move on to next to redirect to /secret
        res.locals.hasActiveSession = true;
        return next();
      }
      else {
        // if not, move on to next to redirect to /signup
        res.locals.hasActiveSession = false;
        return next({ status: 200, log: 'Invalid Session Detected'});
      }
    })
    .catch((err) => {
      return next({ message: { error: 'Session error' }, log: err });
    });
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code here
  res.locals.cookieId = Math.floor(Math.random() * 100) + res.locals.username;
  console.log('Session Started!')
  Session.create({
    cookieId: res.locals.cookieId,
    username: res.locals.username
  })
    .then(() => next())
    .catch((err) => next({ message: { error: 'User Already Logged In' }, log: err })
    );
};

module.exports = sessionController;
