const Session = require('../model/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn Entered')
  const ssid = req.cookies.ssid;
  Session.find({ cookieId: ssid }).exec()
    .then((response) => {
    //   console.log(response);
      if (response.length === 1) {
        res.locals.hasActiveSession = true;
        res.locals.username = {'username': response[0].username, 'user_id': response[0].user_id}
        // res.locals.user_id = response[0].user_id
        return next();
      }
      else {
        // if not, move on to next to redirect to /signup
        res.locals.hasActiveSession = false;
        return next()
        // return next({ status: 200, log: 'Invalid Session Detected'});
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
  res.locals.cookieId = Math.floor(Math.random() * 10000) + res.locals.username.username;
//   console
  console.log('Session Started!')
  Session.create({
    cookieId: res.locals.cookieId,
    username: res.locals.username.username,
    user_id: res.locals.username.user_id
  })
    .then(() => next())
    .catch((err) => next({ message: { error: 'User Already Logged In' }, log: err })
    );
};

module.exports = sessionController;
