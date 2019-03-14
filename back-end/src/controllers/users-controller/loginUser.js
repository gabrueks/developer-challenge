const jwt = require('jsonwebtoken');

const userDTO = require('../../DTO/User');

module.exports = async (req, res, next) => {
    const verifier = await userDTO.verify_user(req.body);
    const user_token = await userDTO.retrieve_token(req.body.email);
    if (typeof verifier !== "boolean") {
        res
            .status(200)
            .json({
                auth: true,
                email: req.body.email,
                user_token: user_token.user_token,
                user_id: user_token.username,
                token: await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),data: verifier }, process.env.SECRET)
            });
    } else {
        res.status(401).json({ auth: false, email: null, token: null });
    }
}
