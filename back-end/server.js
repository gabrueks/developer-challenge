const app = require('express')();

// Middlewares
require('./middlewares')(app);

// DB Start
require('./databaseBootstrap')();

// Users routes setting
require('./src/routes/usersRoutes')(app);
require('./src/routes/usersPrivateRoutes')(app);

// Posts routes setting
require('./src/routes/postsRoutes')(app);

app.listen(process.env.PORT || 8080);
