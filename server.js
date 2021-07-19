const _ = require('./config/constant');
require('dotenv').config({ path: _.CONFIG_FILE });
const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');

// app.use(express.bodyParser());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);

const mongoConnecion = require('./db/mongoDb')(process.env.DB_NAME);

app.listen(process.env.PORT, () => {
    console.log(chalk.yellow('Listening On Port ' + process.env.PORT));
});
