const axios = require('axios');
const stream = require('getstream');

const client = stream.connect(process.env.API_KEY_STREAM, process.env.API_SECRET_STREAM, process.env.API_ID_STREAM);

module.exports = {
    create_user: (username) => {
        return client.createUserToken(username);
    },
    follow_user: async (userFollow, username) => {
        return await axios.post(`${process.env.DEFAULT_ENDPOINT}feed/user/${username}/follows/?api_key=${process.env.API_KEY_STREAM}`,
        { target: `user:${userFollow}` }, require('./auth/getStreamAuth').serverSideAuthFollower(username, userFollow)).catch((err) => console.log(err));
    }
}
