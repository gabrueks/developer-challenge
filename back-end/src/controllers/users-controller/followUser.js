const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    if (await userDTO.isUser(req.body.follow) > 0) {
        getStream.follow_user(req.body.follow, token.username)
            .then((response) => {
                res.status(200).json({ followed: true })
            })
    } else {
        res.status(204).end();
    }
}