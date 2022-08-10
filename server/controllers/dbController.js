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
                message: { err: 'An add error occurred???' },
            })
        })
}



db.getVisit = (req, res, next) => {
    // console.log('lebody', req.body);
    // const { siteName, visitDate, comment, username } = req.body;
    const sqlGetVisit = `SELECT * FROM userData;`;
    // const insertArray = [siteName, visitDate, comment, username, 1];

    userDB.query(sqlGetVisit)
        .then((data) => {
            // console.log(data)
            res.locals.data = data.rows;
            return next()
        })
        .catch((err) => {
            console.log(err)
            return next({
                log: err.detail,
                status: 500,
                message: { err: 'A get error occurred???' },
            })
        });
}

db.patchVisit = (req, res, next) => {
    const sqlPatchVisit = `
    `
    userDB.query(sqlPatchVisit)
    .then()
    .catch((err) => {
        console.log(err)
        return next({
            log: err.detail,
            status: 500,
            message: { err: 'A deletion error occurred???' },
        })
    });

}

db.deleteVisit = (req, res, next) => {
    // console.log(req.body)
    if (!req.body._id) {
        return next({
            log: 'No ID provided',
            status: 500,
            message: { err: 'No ID Provided' },
        })
    }    
    const sqlDeleteVisit = `DELETE FROM userData
    WHERE _id=$1`
    const insertArray = [req.body._id];
    userDB.query(sqlDeleteVisit, insertArray)
    .then((data) => {
        // console.log(data)
        if (data.rowCount === 0){
            return next({
                log: 'Entry already deleted',
                status: 500,
                message: { err: 'Entry already deleted' },
            })
        }
        // console.log('success delete', data)
        return next();
    })
    .catch((err) => {
        console.log(err)
        return next({
            log: err.detail,
            status: 500,
            message: { err: 'A deletion error occurred???' },
        })
    });

}


module.exports = db;