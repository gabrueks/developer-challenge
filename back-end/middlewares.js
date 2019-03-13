const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = (app) => {
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
}
