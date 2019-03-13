const userDTO = require('../../DTO/User');
const getStream = require('../../services/getStream');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.follow_group(req.body.follow, token.username)
        .then(async (response) => {
            await userDTO.addSubscription(req.body.follow, token.username);
            res.status(200).end();
        })
}
