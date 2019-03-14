const stream = require('getstream');

const client = stream.connect(process.env.API_KEY_STREAM, process.env.API_SECRET_STREAM, process.env.API_ID_STREAM);

module.exports = {
    list_feed: async (user_token, username, id_lt_timeline, id_lt_user) => {
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
}
