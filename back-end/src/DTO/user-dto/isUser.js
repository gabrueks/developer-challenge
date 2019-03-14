const User = require('../../models/userModel');

module.exports = (username) => {
    return User.countDocuments({ username }).exec();
}
