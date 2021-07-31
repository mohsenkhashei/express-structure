const express = require('express');
const session = require('express-session');
const app = express();
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` });
const chalk = require('chalk');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
require('./db/mongoDb')(process.env.MONGODB_NAME);

const morganMiddleware = require('./middleware/morganMiddleware');
app.use(morganMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookieParser());
app.use(flash());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./routes')(app);

app.listen(process.env.PORT, () => {
    console.log(chalk.yellow('Listening On Port ' + process.env.PORT));
});
