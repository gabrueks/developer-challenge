const userDTO = require('../../DTO/User');
const getStream = require('../../services/getStream');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.like_post(token.username, req.body.activityId, req.body.isLiked, req.body.likeId);
    res.status(200).end();
}