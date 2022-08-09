const userDB = require('../model/model.js')
// const 

const db = {}

// we are assuming all of the post request data will be in the body

db.addVisit = (req, res, next) => {
    console.log('thebody: ', req.body);
    const { siteName, visitDate, comment, username } = req.body;
    const sqlAddVisit = `INSERT INTO userData (site_name, visit_date, comment, username, site_id)
    VALUES ($1, $2, $3, $4, $5)`;
    const insertArray = [siteName, visitDate, comment, username, 1];

    userDB.query(sqlAddVisit, insertArray)
        .then((data) => next())
        .catch((err) => {
            // console.log(err)
            return next({
                log: err.detail,
                status: 500,
                message: { err: 'An error occurred' },
            })
        })    
}



db.getVisit = (req, res, next) => {
    console.log(req.body);
    const { siteName, visitDate, comment, username } = req.body;
    const sqlAddVisit = `INSERT INTO userData (site_name, visit_date, comment, username, site_id)
    VALUES ($1, $2, $3, $4, $5)`;
    const insertArray = [siteName, visitDate, comment, username, 1];

    userDB.query(sqlAddVisit, insertArray)
        .then((data) => next())
        .catch((err) => {
            // console.log(err)
            return next({
                log: err.detail,
                status: 500,
                message: { err: 'An error occurred' },
            })
        })    
}


module.exports = db;