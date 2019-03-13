const guard = require('../guard/guard');

module.exports = (app) => {
    const posts = require('../controllers/postsController')

    app.use(guard.verifierJWT);

    app.route('/api/v1/list-post')
      .get(posts.list_posts)
  
    app.route('/api/v1/create-post')
      .post(posts.create_post)

    app.route('/api/v1/create-post-timeline')
      .post(posts.create_post_timeline);

    app.route('/api/v1/create-comment')
      .post(posts.create_comment)

    app.route('/api/v1/get-comments')
      .post(posts.more_comments)

    app.route('/api/v1/like-post')
      .put(posts.like_post)
}
