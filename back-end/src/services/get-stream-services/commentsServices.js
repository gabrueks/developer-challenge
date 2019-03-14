const axios = require('axios');

module.exports = {
    more_comments: async (url, username) => {
        return await axios.get(`${process.env.DEFAULT_ENDPOINT}${url}&api_key=${process.env.API_KEY_STREAM}`, require('./auth/getStreamAuth').clientSideAuth(username)).catch((err) => console.log(err));
    },
    create_comment: async (username, text, activityId) => {
        return await axios.post(`${process.env.DEFAULT_ENDPOINT}reaction/?api_key=${process.env.API_KEY_STREAM}`, {
            user_id: username,
            kind: 'comment',
            activity_id: activityId,
            data: {
                text
            }
        }, require('./auth/getStreamAuth').clientSideAuth(username)).catch((err) => console.log(err));
    }
}
