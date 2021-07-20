require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` });
const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');

// logging
const morganMiddleware = require('./middleware/morganMiddleware');
app.use(morganMiddleware);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);
app.use(express.urlencoded({ extended: false }));

// session
const session = require('./config/session');
app.use(session);

const mongoConnecion = require('./db/mongoDb')(process.env.MONGODB_NAME);

app.listen(process.env.PORT, () => {
    console.log(chalk.yellow('Listening On Port ' + process.env.PORT));
});
