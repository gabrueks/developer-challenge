const userDTO = require('../../DTO/User');
const getStream = require('../../services/getStream');

module.exports = async (req, res) => {
    const token = await userDTO.retrieve_token(req.get('email'));    
    getStream.create_comment(token.username, req.body.text, req.body.activityId)
        .then((response) => {
           res.status(201).json(response.data);
        })
        .catch((err) => {
            res.status(204).end();
        });
}
