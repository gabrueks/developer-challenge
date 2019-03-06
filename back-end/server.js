const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 8080;

let DBURI = '';


const dbUsername = process.env.DB_MONGODB_USER || `admin`;
const dbPassword = process.env.DB_MONGODB_PASS || `admin`;

(process.env.DATABASE_HOST && process.env.DATABASE_NAME && process.env.DB_MONGODB_USER && process.env.DB_MONGODB_PASS) ?
    DBURI = `mongodb://${dbUsername}:${dbPassword}@${process.env.DATABASE_HOST}` +
    `:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
    : DBURI = `mongodb://127.0.0.1:27017/social-network`

// Middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(logger('common', {
    skip: (req) => {
        return (req.url === '/') ? true : false;
    }
}));
app.use(cors());
app.use('/healthcheck', require('express-healthcheck')());

// Users routes setting
const usersRoutes = require('./src/routes/usersRoutes');
usersRoutes(app);

// Posts routes setting
const postsRoutes = require('./src/routes/postsRoutes');
postsRoutes(app);

app.listen(PORT, async () => {
    await mongoose.connect(
        'mongodb://campai-mongo:27017/social-network', {
            useNewUrlParser: true,
            useCreateIndex: true
        }
        ).catch(async (err) => {
            console.error(err);
            await mongoose.connect(
                'mongodb://127.0.0.1:27017/social-network', {
                    useNewUrlParser: true,
                    useCreateIndex: true
                })
        });
});