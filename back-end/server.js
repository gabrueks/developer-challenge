const app = require('express')();
const middlewares = require('./middlewares');
const dbBootstrap = require('./databaseBootstrap');

// Middlewares
middlewares(app);

// DB Start
dbBootstrap();

// Users routes setting
require('./src/routes/usersRoutes')(app);
require('./src/routes/usersPrivateRoutes')(app);

// Posts routes setting
require('./src/routes/postsRoutes')(app);

app.listen(process.env.PORT || 8080);
