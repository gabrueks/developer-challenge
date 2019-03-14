const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

exports.save_user = async (newUser) => {
    let response = false;
    if (typeof newUser === 'object') {
        try {
            response = true;
            await new User(newUser).save();
        } catch (err) {
            console.error(err.errmsg);
            response = false;
        }
    }
    return (response)
        ? { code: 201, situation: { created: true } }
        : { code: 400, situation: { created: false } };
}

exports.getPassword = (email) => {
    return User.findOne({ email }).exec();
}

exports.isUser = (username) => {
    return User.countDocuments({ username }).exec();
}

exports.addSubscription = (group, username) => {
    return User.findOneAndUpdate({ username }, { '$push': { subscriptions: group } }).exec();
}

exports.getSubscriptions = (email) => {
    return User.findOne({ email }).exec();
}

exports.verify_user = async (loginUser) => {
    const isValid = await User.find({ email: loginUser.email });
    if (isValid.length > 0) {
        if (await bcrypt.compare(loginUser.password, isValid[0].password)) {
            return isValid[0]._id;
        }
    }
    return false;
}

exports.retrieve_token = (email) => {
    return User.findOne({ email: email }, 'user_token username').exec();
}
