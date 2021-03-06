const userDTO = require('../../DTO/UserIndex');
const getStream = require('../../services/getStreamIndex');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));
    res.status(201).json({post: await getStream.create_post(token.username, req.body.value)});
}
