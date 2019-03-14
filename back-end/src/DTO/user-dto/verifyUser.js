const bcrypt = require('bcrypt');

const User = require('../../models/userModel');

module.exports = async (loginUser) => {
    const isValid = await User.find({ email: loginUser.email });
    if (isValid.length > 0) {
        if (await bcrypt.compare(loginUser.password, isValid[0].password)) {
            return isValid[0]._id;
        }
    }
    return false;
}