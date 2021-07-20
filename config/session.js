const session = require('express-session');
require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` });
session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    resave: false,
    saveUninitialized: false,
});
module.exports = session;
