# Camping-History :tent:
A simple app to keep track of all of the places you have camped at.

There are two files which must be provided to get the app to work, which are `sql-uri.js` and `googleclient.js`



`server/model/sql-uri.js`

```
const PG_URI = INSERT YOUR POSTGRESQL URI HERE

module.exports = PG_URI;
```
`server/routers/googleclient.js`
```
const GOOGLE_CLIENT_ID = INSERT YOUR CLIENT_ID HERE
const GOOGLE_CLIENT_SECRET = INSERT YOUR CLIENT_ID_SECRET HERE

module.exports = {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET}
```