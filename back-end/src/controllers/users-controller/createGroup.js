const getStream = require('../../services/getStreamIndex');
const userDTO = require('../../DTO/UserIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    getStream.create_group(req.body.name, token.username)
        .then((response) => {
            res.status(201).end();
        })
}
