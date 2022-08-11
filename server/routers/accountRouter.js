const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController.js')
const userController = require('../controllers/userController.js')
const sessionController = require('../controllers/sessionController.js')

router.get('/', (req, res) => {
    res.sendStatus(201)
})

router.post('/login',
    userController.verifyUser,
    sessionController.startSession,
    cookieController.setSSIDCookie,
    (req, res) => {
        // return res.redirect('/')
        return res.status(200).send({ username: res.locals.username })
    }
)

router.post('/signup')

router.delete('/logout',
    sessionController.endSession,
    (req, res) => {
        return res.sendStatus(200)
    });
module.exports = router;