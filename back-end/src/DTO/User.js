const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

exports.save_user = async (newUser) => {
    let response = false;
    if (typeof newUser === 'object') {
        await new User(newUser)
            .save()
            .then(() => response = true)
            .catch((err) => console.log(err.errmsg));
    }
    return (response)
        ? { code: 201, situation: { created: true } }
        : { code: 400, situation: { created: false } };
}

exports.isUser = async (username) => {
    return await User.countDocuments({ username });
}

exports.getPassword = async (email) => {
    console.log((await User.findOne({ email })).password);
}

exports.addSubscription = async (group, username) => {
    return await User.findOneAndUpdate({ username }, { '$push': { subscriptions: group } })
}

exports.getSubscriptions = async (email) => {
    console.log(email);
    return await User.findOne({ email });
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

exports.retrieve_token = async (email) => {
    return await User.findOne({ email: email }, 'user_token username');
}

exports.isConnected = async (username) => {
    return await User.findOne({ username: username }, 'isActive');
}

exports.connection = async (username, isActive) => {
    return await User.findOneAndUpdate({ username: username }, { isActive: isActive });
}
