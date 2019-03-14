const jwt = require('jsonwebtoken');

module.exports = {
    serverSideAuthFollower: (username, personFollow) => {
        return {
            headers: {
                "Stream-Auth-Type": 'jwt',
                "Content-Type": 'application/json',
                "Authorization": jwt.sign({
                    resource: 'follower',
                    action: 'write',
                    feed_id: `user${username}`
                }, process.env.API_SECRET_STREAM)
            }
        }
    },
    serverSideAuthFollowerGroup: (username, personFollow) => {
        return {
            headers: {
                "Stream-Auth-Type": 'jwt',
                "Content-Type": 'application/json',
                "Authorization": jwt.sign({
                    resource: 'follower',
                    action: 'write',
                    feed_id: `timeline${username}`
                }, process.env.API_SECRET_STREAM)
            }
        }
    },
    clientSideAuth: (username) => {
        return {
            headers: {
                "Stream-Auth-Type": 'jwt',
                "Content-Type": 'application/json',
                "Authorization": jwt.sign({'user_id': username}, process.env.API_SECRET_STREAM)
            }
        }
    }
}
