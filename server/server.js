const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
// const cookieController = require('./controllers/cookieController.js')
// const userController = require('./controllers/userController.js')
const dbController = require('./controllers/dbController.js');
const sessionController = require('./controllers/sessionController.js')
const authRouter = require('./routers/authRouter.js')
const accountRouter = require('./routers/accountRouter.js')

const app = express();

const PORT = 3000;

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/campinghistory';
mongoose.connect(mongoURI);


// app.post('/login',
// (req, res) => {
//     return res.sendStatus(418);
// }
// )
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/account', accountRouter)

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.get('/style.css',
    (req, res) => {
        return res.status(200).sendFile(path.resolve(__dirname, '../style.css'));
    }
)


app.use('/cookie',
    (req, res) => {
        res.cookie('cooks', 'ohhddoo', { httpOnly: true })
        // console.log('baseget', path.resolve(__dirname, '../index.html'))
        return res.send('/');
    }
)

// handle get requests
app.get('/',
    (req, res) => {
        // console.log('baseget', path.resolve(__dirname, '../index.html'))
        return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    }
)

// handle get request to the database
app.post('/getvisit',
    sessionController.isLoggedIn,
    dbController.getVisit,
    (req, res) => {
        return res.status(200).send({ data: res.locals.data, username: res.locals.username })
    }
);

// handle post requests to the database
app.post('/addvisit',
    dbController.addVisit,
    dbController.getVisit,
    (req, res) => {
        return res.status(200).send(res.locals.data)
    }
);

app.patch('/addvisit',
    dbController.patchVisit,
    dbController.getVisit,
    (req, res) => {
        return res.status(200).send(res.locals.data)
    }
);

// remove visit
app.delete('/deletevisit',
    dbController.deleteVisit,
    dbController.getVisit,
    (req, res) => {
        return res.status(200).send(res.locals.data)
    }
)



// Create error handlers here:
app.use((req, res) => res.status(404));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// start the server

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;