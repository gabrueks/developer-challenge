const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const getStream = require('../services/getStream');

const userDTO = require('../DTO/User');

exports.create_user = async (req, res) => {
    let body = req.body;
    body.user_token = getStream.create_user(body.username);
    body.password = await bcrypt.hash(body.password, 10);
    const userSaved = await userDTO.save_user(body);
    res.status(userSaved.code).json(userSaved.situation);
}

exports.login_user = async (req, res, next) => {
    const verifier = await userDTO.verify_user(req.body);
    const user_token = await userDTO.retrieve_token(req.body.email);
    if (typeof verifier !== "boolean") {
        res
            .status(200)
            .json({
                auth: true,
                email: req.body.email,
                user_token: user_token.user_token,
                user_id: user_token.username,
                token: await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),data: verifier }, process.env.SECRET || `secret`)
            });
    } else {
        res.status(401).json({ auth: false, email: null, token: null });
    }
}

exports.create_group = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    await getStream.create_group(req.body.name, token.username)
        .then((response) => {
            res.status(201).end();
        })
        .catch((err) => {
            res.status(500).end();
        })
}

exports.follow_group = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    console.log(await userDTO.addSubscription(req.body.follow, token.username));
    await getStream.follow_group(req.body.follow, token.username)
      .then((response) => {
        res.status(200).end();
      })
      .catch((err) => {
        res.status(500).end();
      })
}

exports.get_subscriptions = async (req, res) => {
    console.log(req.body);
    const subscriptions = (await userDTO.getSubscriptions(req.get('email'))).subscriptions;
    res.status(200).json({ subscriptions });
}

exports.forget_password = async (req, res) => {
    // To do
    console.log(await userDTO.getPassword(req.body.email).password);
}

exports.logout_user = async (req, res) => {
    res.status(200).json({
        auth: false,
        token: null
    });
}

exports.follow_user = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    if (await userDTO.isUser(req.body.follow) > 0) {
        await getStream.follow_user(req.body.follow, token.username)
            .then((response) => {
                res.status(200).json({ followed: true })
            })
            .catch((err) => {
                res.status(500).end()
            })
    } else {
        res.status(204).end();
    }
}

exports.all_users = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json({
        users: allUsers
    });
}