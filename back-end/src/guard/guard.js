const jwt = require('jsonwebtoken');

exports.verifierJWT = (req, res, next) => {
    if (!req.get('x-access-token')) {
        res.status(401).json({
            auth: false,
            message: 'No token provided.'
        });
    }
    jwt.verify(req.get('x-access-token'), process.env.SECRET || `secret`, (err, decoded) => {
        if (err) {
            res.status(401).json({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        } else {
            next();
        }
    });
}