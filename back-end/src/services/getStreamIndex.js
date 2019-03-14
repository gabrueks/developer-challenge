// Users functions
exports.create_user = require('./get-stream-services/userServices').create_user;
exports.follow_user = require('./get-stream-services/userServices').follow_user;

// Comments functions
exports.more_comments = require('./get-stream-services/commentsServices').more_comments;
exports.create_comment = require('./get-stream-services/commentsServices').create_comment;

// Posts functions
exports.create_post = require('./get-stream-services/postsServices').create_posts;
exports.create_post_timeline = require('./get-stream-services/postsServices').create_post_timeline;
exports.like_post = require('./get-stream-services/postsServices').like_post;

// Groups functions
exports.create_group = require('./get-stream-services/groupServices').create_group;
exports.follow_group = require('./get-stream-services/groupServices').follow_group;

// Feed functions
exports.list_feed = require('./get-stream-services/feedServices').list_feed;
