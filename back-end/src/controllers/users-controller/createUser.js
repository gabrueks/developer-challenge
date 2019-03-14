const bcrypt = require('bcrypt');

const getStream = require('../../services/getStreamIndex');
const userDTO = require('../../DTO/UserIndex');

module.exports = async (req, res) => {
    let body = req.body;
    body.user_token = getStream.create_user(body.username);
    body.password = await bcrypt.hash(body.password, 10);
    const userSaved = await userDTO.save_user(body);
    res.status(userSaved.code).json(userSaved.situation);
}
