const guard = require('../guard/guard');

module.exports = (app) => {
    const posts = require('../controllers/postsController')

    app.route('/api/v1/list-post')
      .get(guard.verifierJWT, posts.list_posts)
  
    app.route('/api/v1/create-post')
      .post(guard.verifierJWT, posts.create_post)

    app.route('/api/v1/create-comment')
      .post(guard.verifierJWT, posts.create_comment)

    app.route('/api/v1/get-comments')
      .post(guard.verifierJWT, posts.more_comments)

      app.route('/api/v1/like-post')
      .put(guard.verifierJWT, posts.like_post)
}
