const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.follow_group(req.body.follow, token.username)
        .then(async (response) => {
            await userDTO.add_subscription(req.body.follow, token.username);
            res.status(200).end();
        })
}
