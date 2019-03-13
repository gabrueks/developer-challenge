'use strict'
const guard = require('../guard/guard');

module.exports = (app) => {
    const users = require('../controllers/usersController')

    app.use(guard.verifierJWT);

    app.route('/api/v1/logout')
      .post(users.logout_user)

    app.route('/api/v1/follow')
      .put(users.follow_user)

    app.route('/api/v1/create-group')
      .post(users.create_group)

    app.route('/api/v1/follow-group')
      .put(users.follow_group)

    app.route('/api/v1/subscriptions')
      .get(users.get_subscriptions)
}
