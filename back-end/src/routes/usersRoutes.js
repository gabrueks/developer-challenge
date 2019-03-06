'use strict'
const guard = require('../guard/guard');

module.exports = (app) => {
    const users = require('../controllers/usersController')

    app.route('/api/v1/signup')
      .post(users.create_user)

   app.route('/api/v1/login')
      .post(users.login_user)

      app.route('/api/v1/reset')
      .post(users.forget_password)

    app.route('/api/v1/logout')
      .post(guard.verifierJWT, users.logout_user)

    app.route('/api/v1/users')
      .get(guard.verifierJWT, users.all_users)

    app.route('/api/v1/follow')
      .put(guard.verifierJWT, users.follow_user)

    app.route('/api/v1/create-group')
      .post(guard.verifierJWT, users.create_group)

    app.route('/api/v1/follow-group')
      .put(guard.verifierJWT, users.follow_group)

    app.route('/api/v1/subscriptions')
      .get(guard.verifierJWT, users.get_subscriptions)
}
