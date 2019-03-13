const app = require('express')();
const dotenv = require('dotenv');
const middlewares = require('./middlewares');
const dbBootstrap = require('./databaseBootstrap');

// Middlewares
middlewares(app);

// DB Start
dbBootstrap();

// Start prod variables
if (process.env.ENV === 'prod') {
    dotenv.config();
}

// Users routes setting
const usersRoutes = require('./src/routes/usersRoutes');
usersRoutes(app);

// Posts routes setting
const postsRoutes = require('./src/routes/postsRoutes');
postsRoutes(app);

app.listen(process.env.PORT || 8080);
