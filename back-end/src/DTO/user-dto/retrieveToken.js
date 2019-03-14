const User = require('../../models/userModel');

module.exports = (email) => {
    return User.findOne({ email: email }, 'user_token username').exec();
}
