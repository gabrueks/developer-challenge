const stream = require('getstream');
const axios = require('axios');
const client = stream.connect(process.env.API_KEY_STREAM, process.env.API_SECRET_STREAM, process.env.API_ID_STREAM);

module.exports = {
    create_posts: async (username, text) => {
        return await client.feed('user', username)
                .addActivity({actor: username, verb: 'user', object: text, foreign_id: `user:${username}`});
    },
    create_post_timeline: async (username, text, timeline) => {
        return await client.feed('timeline', username)
            .addActivity({actor: username, verb: 'timeline', object: text, foreign_id: `timeline:${timeline}`});
    },
    like_post: async (username, activityId, isLiked, likeId) => {
        if (likeId === null) {
            return await axios.post(`${process.env.DEFAULT_ENDPOINT}reaction/?api_key=${process.env.API_KEY_STREAM}`, {
                kind: 'like',
                activity_id: activityId,
                user_id: username
            }, require('./auth/getStreamAuth').clientSideAuth(username));
        } else {
            return await axios.delete(`${process.env.DEFAULT_ENDPOINT}reaction/${likeId}/?api_key=${process.env.API_KEY_STREAM}`, require('./auth/getStreamAuth').clientSideAuth(username)).catch((err) => console.log(err));
        }
    }
}
