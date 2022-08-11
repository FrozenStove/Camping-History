const express = require('express');
const router = express.Router();

const passport = require('passport');

require('./oauth.js')
// this fixes some 400 type yellow error on chrome
// require('https').globalAgent.options.rejectUnauthorized = false;

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(418);
}


router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
    (req, res) => {
        console.log('success in auth/google')
        return res.status(200).send('login to google');
    }

)

router.get('/google/callback',
    (req, res, next) => {
        console.log('callback from google')
        return next()
    },
    passport.authenticate('google', {
        // successRedirect: '/',
        // failureRedirect: '/auth/failed'
    }),
    (req, res) => {
        return res.status(200).send('successfully logged into google');
    }
)

router.get('/failed',
    (req, res) => {
        return res.status(401).send('Error Logging In');
    }
)

module.exports = router;