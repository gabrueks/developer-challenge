const mongoose = require('mongoose');

const userDTO = require('../DTO/User');
const stream = require('../services/getStream');

exports.create_post = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    res.status(201).json({post: await stream.create_post(token.username, req.body.value)});
}

exports.list_posts = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    stream.list_feed(token.user_token, token.username, req.get('last'))
        .then((posts) => {
            res.status(200).json({
              posts: posts
            });
        })
        .catch((err) => {
            res.status(204).end();
        });
}

exports.create_comment = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));    
    stream.create_comment(token.username, req.body.text, req.body.activityId)
        .then((response) => {
           res.status(201).json(response.data);
        })
        .catch((err) => {
            res.status(204).end();
        });
}

exports.more_comments = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    stream.more_comments(req.body.url, token.username)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            res.json(204).end();
        });
}

exports.like_post = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    await stream.like_post(token.username, req.body.activityId, req.body.isLiked, req.body.likeId);
    res.status(200).end();
}