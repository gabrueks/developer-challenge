const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    res.status(200).json({
        posts: await getStream.list_feed(token.user_token, token.username, req.get('last_timeline'), req.get('last_user'))
    });
}
