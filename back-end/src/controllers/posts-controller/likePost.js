const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    const activityId = await getStream.like_post(token.username, req.body.activityId, req.body.isLiked, req.body.likeId);
    if (activityId.data) {
        res.status(201).json({
            activityId: activityId.data.activity_id
        })
    } else {
        res.status(200).end();
    }
}