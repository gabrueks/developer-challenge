'use strict'
const guard = require('../guard/guard');

module.exports = (app) => {
    const users = require('../controllers/usersControllerIndex')

    app.route('/api/v1/signup')
      .post(users.create_user)

   app.route('/api/v1/login')
      .post(users.login_user)
}
