const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController.js')
const userController = require('../controllers/userController.js')
const sessionController = require('../controllers/sessionController.js')

router.get('/', (req, res) => {
    res.sendStatus(418)
})

router.post('/login',
    userController.verifyUser,
    sessionController.startSession,
    cookieController.setSSIDCookie,
    (req, res) => {
        return res.status(200).json({username : res.locals.username})
    }
)

module.exports = router;