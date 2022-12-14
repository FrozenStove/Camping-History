const userDB = require('../models/model')

const db = {}

// we are assuming all of the post request data will be in the body
db.addVisit = (req, res, next) => {
    console.log('addvisit entered')
    // console.log('thebody: ', req.body);
    const { user_id, siteName, visitDate, comment, username } = req.body;
    let sqlAddVisit = `INSERT INTO userData (site_name, visit_date, comment, username, site_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const insertArray = [siteName, visitDate, comment, username, 1, user_id];
    console.log('addvisit:', insertArray)
// if(!req.body.user_id){

// }

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
    let sqlGetVisit = `SELECT * FROM userData WHERE user_id=$1 ORDER BY _id;`;
    // THIS NEEDS TO BE FIXED FOR USER ACCOUNTS AND OAUTH
    const insertArray = [null];
    if (req.body.user_id) {
        insertArray[0] = req.body.user_id;
    } else if (res.locals.username) {
        insertArray[0] = res.locals.username.user_id;
    }

    // we do this because apparently you cant have an input array when you arent asking for inputs
    if (insertArray[0] === null) {
        sqlGetVisit = `SELECT * FROM userData WHERE user_id IS NULL ORDER BY _id;`;
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
    } else {
        userDB.query(sqlGetVisit, insertArray)
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
}

db.patchVisit = (req, res, next) => {
    if (!req.body._id) return next({
        log: 'No ID provided',
        status: 204,
        message: { err: 'No ID Provided' },
    });
    const sqlPatchVisit = `
    UPDATE userData
    SET site_name = $1, visit_date = $2, comment = $3, username = $4
    WHERE _id=$5
    `
    const { _id, siteName, visitDate, comment, username } = req.body;
    const insertArray = [siteName, visitDate, comment, username, _id];
    console.log(req.body)
    userDB.query(sqlPatchVisit, insertArray)
        .then((data) => {
            console.log(data);
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
            if (data.rowCount === 0) {
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