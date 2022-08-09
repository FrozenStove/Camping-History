const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const dbController = require('./controllers/dbController.js')

const PORT = 3000;


app.use(express.json())
app.use(cookieParser())



app.use('/build', express.static(path.join(__dirname, '../build')));

// handle get requests
app.get('/',
    (req, res) => {
        return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
    }
)

// handle get request to the database
app.get('/getvisit',
    dbController.getVisit,
    (req, res) => {
        return res.status(200).send('Success!')
    }
);


// handle post requests to the database
app.post('/addvisit',
    dbController.addVisit,
    (req, res) => {
        return res.status(200).send('Success!')
    }
);



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


