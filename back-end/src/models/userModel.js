const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: 'Name required'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    user_token: {
        type: String,
        required: true
    },
    subscriptions: {
      type: Array,
      default: []
    }
});

module.exports = mongoose.model('Users', UserSchema);
