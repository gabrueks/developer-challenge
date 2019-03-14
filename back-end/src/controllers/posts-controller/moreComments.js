const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.more_comments(req.body.url, token.username)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            res.json(204).end();
        });
}
