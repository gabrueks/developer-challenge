const axios = require('axios');

module.exports = {
    create_group: async (name, username) => {
        return await axios.post(`${process.env.DEFAULT_ENDPOINT}feed/timeline/${username}/follows/?api_key=${process.env.API_KEY_STREAM}`, 
        { target: `timeline:${name}` }, require('./auth/getStreamAuth').serverSideAuthFollowerGroup(username, name)).catch((err) => console.log(err));
    },
    follow_group: async (userFollow, username) => {
        return await axios.post(`${process.env.DEFAULT_ENDPOINT}feed/timeline/${username}/follows/?api_key=${process.env.API_KEY_STREAM}`, 
        { target: `timeline:${userFollow}` }, require('./auth/getStreamAuth').serverSideAuthFollowerGroup(username, userFollow)).catch((err) => console.log(err));
    }
}
