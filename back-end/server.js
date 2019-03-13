const app = require('express')();
const middlewares = require('./middlewares');
const dbBootstrap = require('./databaseBootstrap');

// Middlewares
middlewares(app);

// DB Start
dbBootstrap();

// Users routes setting
const usersRoutes = require('./src/routes/usersRoutes');
usersRoutes(app);

// Posts routes setting
const postsRoutes = require('./src/routes/postsRoutes');
postsRoutes(app);

app.listen(process.env.PORT || 8080);
