const stream = require('getstream');
const axios = require('axios');

const ioServer = require('../../server');
const User = require('../DTO/User');
const jwt = require('jsonwebtoken');

const API_KEY_STREAM = process.env.API_KEY_STREAM || '33rpj3hmmh35';
const API_SECRET_STREAM = process.env.API_SECRET_STREAM || 'yfu6hajqvrdbxgfrun85tuqxycexzbfeefhjer4gr6k6qserjapjpt8kv3sqawrx';
const API_ID_STREAM = process.env.API_ID_STREAM || '48095';
const DEFAULT_ENDPOINT = process.env.STREAM_ENDPOINT || 'https://us-east-api.stream-io-api.com/api/v1.0/';

const client = stream.connect('33rpj3hmmh35', 'yfu6hajqvrdbxgfrun85tuqxycexzbfeefhjer4gr6k6qserjapjpt8kv3sqawrx', '48095');

exports.create_user = (username) => {
    return client.createUserToken(username);
}

exports.list_feed = async (user_token, username, id_lt_timeline, id_lt_user) => {
    const userFeed = (await client.feed('user', username)
        .get({
            limit: 5,
            id_lt: (id_lt_user !== '') ? id_lt_user : undefined ,
            reactions: {
                recent: true, 
                counts: true,
                recent: true
            }
        })).results;
    const groupsFeed = (await client.feed('timeline', username)
        .get({
            limit: 5,
            id_lt: (id_lt_timeline !== '') ? id_lt_timeline : undefined ,
            reactions: {
                recent: true, 
                counts: true,
                recent: true
            }
        })).results;
    return userFeed.concat(groupsFeed);
}

exports.more_comments = async (url, username) => {
    return await axios.get(`${DEFAULT_ENDPOINT}${url}&api_key=${API_KEY_STREAM}`, clientSideAuth(username)).catch((err) => console.log(err))
}

exports.follow_user = async (userFollow, username) => {
    return await axios.post(`${DEFAULT_ENDPOINT}feed/user/${username}/follows/?api_key=${API_KEY_STREAM}`, { target: `user:${userFollow}` }, serverSideAuthFollower(username, userFollow)).catch(err => console.log(err));
}

exports.create_post = async (username, text) => {
    return await client.feed('user', username)
            .addActivity({actor: username, verb: 'user', object: text, foreign_id: `user:${username}`}).catch((err) => console.log(err));
}

exports.create_post_timeline = async (username, text, timeline) => {
    return await client.feed('timeline', username)
        .addActivity({actor: username, verb: 'timeline', object: text, foreign_id: `timeline:${timeline}`}).catch((err) => console.log(err));
}

exports.like_post = async (username, activityId, isLiked, likeId) => {
    if (likeId === null) {
        return await axios.post(`${DEFAULT_ENDPOINT}reaction/?api_key=${API_KEY_STREAM}`, {
            kind: 'like',
            activity_id: activityId,
            user_id: username
        }, clientSideAuth(username)).catch((err) => console.log(err));
    } else {
        return await axios.delete(`${DEFAULT_ENDPOINT}reaction/${likeId}/?api_key=${API_KEY_STREAM}`, clientSideAuth(username)).catch((err) => console.log(err));
    }
}

exports.create_comment = async (username, text, activityId) => {
    return await axios.post(`${DEFAULT_ENDPOINT}reaction/?api_key=${API_KEY_STREAM}`, {
        user_id: username,
        kind: 'comment',
        activity_id: activityId,
        data: {
            text
        }
    }, clientSideAuth(username)).catch(err => err);
}

exports.create_group = async (name, username) => {

    return await axios.post(`${DEFAULT_ENDPOINT}feed/timeline/${username}/follows/?api_key=${API_KEY_STREAM}`, { target: `timeline:${name}` }, serverSideAuthFollowerGroup(username, name)).catch(err => console.log(err));
}

exports.follow_group = async (userFollow, username) => {
    return await axios.post(`${DEFAULT_ENDPOINT}feed/timeline/${username}/follows/?api_key=${API_KEY_STREAM}`, { target: `timeline:${userFollow}` }, serverSideAuthFollowerGroup(username, userFollow)).catch(err => console.log(err));
}

function clientSideAuth(username) {
    return {
        headers: {
            "Stream-Auth-Type": 'jwt',
            "Content-Type": 'application/json',
            "Authorization": jwt.sign({'user_id': username}, API_SECRET_STREAM)
        }
    }
}

function serverSideAuthFollower(username, personFollow) {
    return {
        headers: {
            "Stream-Auth-Type": 'jwt',
            "Content-Type": 'application/json',
            "Authorization": jwt.sign({
                resource: 'follower',
                action: 'write',
                feed_id: `user${username}`
            }, API_SECRET_STREAM)
        }
    }
}

function serverSideAuthFollowerGroup(username, personFollow) {
    return {
        headers: {
            "Stream-Auth-Type": 'jwt',
            "Content-Type": 'application/json',
            "Authorization": jwt.sign({
                resource: 'follower',
                action: 'write',
                feed_id: `timeline${username}`
            }, API_SECRET_STREAM)
        }
    }
}