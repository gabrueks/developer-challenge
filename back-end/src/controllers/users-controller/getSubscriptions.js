const userDTO = require('../../DTO/User')

module.exports = async (req, res) => {
    const subscriptions = (await userDTO.get_subscriptions(req.get('email'))).subscriptions;
    res.status(200).json({ subscriptions });
}
