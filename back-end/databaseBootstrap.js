const mongoose = require('mongoose');

let DBURI;

(process.env.DATABASE_HOST && process.env.DATABASE_NAME && process.env.DB_MONGODB_USER && process.env.DB_MONGODB_PASS) ?
    DBURI = `mongodb://${process.env.DATABASE_HOST}` +
    `:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
    : DBURI = process.env.MONGO_URI;

module.exports = () => {
    mongoose.connect(DBURI,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .catch((err) => {
        console.error(err);
    });
}
