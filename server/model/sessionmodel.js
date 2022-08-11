const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 600, default: Date.now },
  username: { type: String, required: true},
  user_id: { type: Number, required: true}
});

module.exports = mongoose.model('Session', sessionSchema);
