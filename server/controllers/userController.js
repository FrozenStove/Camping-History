const userDB = require('../models/model.js');

const userController = {};

userController.newUser = (req, res, next) => {
    // console.log('thebody: ', req.body);
    const { password, username } = req.body;
    const sqlAddVisit = `INSERT INTO userAccounts (username, password, email)
    VALUES ($1, $2, $3)`;
    const insertArray = [username, password, 'someone@google.com'];

    userDB.query(sqlAddVisit, insertArray)
        .then((data) => {
            console.log(data)
            return next()
        })
        .catch((err) => {
            // console.log(err)
            return next({
                log: err.detail,
                status: 500,
                message: { err: 'An add error occurred making new user' },
            })
        })
}

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
    // write code here
    // receive username and password from req b, save it as const
    const { password, username } = req.body;
    const sqlAddVisit = `SELECT * FROM userAccounts 
    WHERE username=$1
    AND password=$2`;
    const insertArray = [username, password];

    userDB.query(sqlAddVisit, insertArray)
        .then((data) => {
            if (data.rows.length === 1) {
                res.locals.success = true;
                res.locals.username = username;
                return next()
            } else {
                return next({
                    log: 'db query returned 0 or more than 1 result',
                    status: 401,
                    message: { err: 'An add error occurred logging in' },
                })
            }
        })
        .then((data) => {
            console.log(data)
            return next()
        })
        .catch((err) => {
            // console.log(err)
            return next({
                log: err.detail,
                status: 500,
                message: { err: 'An add error occurred making new user' },
            })
        })// compare submitted password with save password from database
};

module.exports = userController;
