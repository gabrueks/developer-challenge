const User = require('../../models/userModel');

module.exports = async (newUser) => {
    let response = false;
    if (typeof newUser === 'object') {
        try {
            response = true;
            await new User(newUser).save();
        } catch (err) {
            console.error(err.errmsg);
            response = false;
        }
    }
    return (response)
        ? { code: 201, situation: { created: true } }
        : { code: 400, situation: { created: false } };
}