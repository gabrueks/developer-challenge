const userDTO = require('../../DTO/User');
const getStream = require('../../services/getStream');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.create_post_timeline(token.username, req.body.text, req.body.timeline)
        .then((response) => {
            res.status(201).end();
        })
        .catch((err) => {
            res.status(500).end();
        })
}