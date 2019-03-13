const User = require('../models/userModel');
const getStream = require('../services/getStream');
const userDTO = require('../DTO/User');

exports.create_user = require('./users-controller/createUser');
exports.login_user = require('./users-controller/loginUser');
exports.create_group = require('./users-controller/createGroup');
exports.follow_group = require('./users-controller/followGroup');
exports.logout_user = require('./users-controller/logoutUser');
exports.get_subscriptions = require('./users-controller/getSubscriptions');
exports.follow_user = require('./users-controller/followUser');

exports.forget_password = async (req, res) => {
    // To do
    console.log(await userDTO.getPassword(req.body.email).password);
}
