const User = require('../../models/userModel');

module.exports = (group, username) => {
    return User.findOneAndUpdate({ username }, { '$push': { subscriptions: group } }).exec();
}