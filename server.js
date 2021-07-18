const express = require('express');
const app = express();
const _ = require('./config/constant');

require('dotenv').config({ path: _.CONFIG_FILE });
const chalk = require('chalk');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);
// const employees = require('./routes/employee');
// app.use('/employees', employees);
const mongoConnecion = require('./db/mongoDb')(process.env.DB_NAME);

app.listen(process.env.PORT, () => {
	console.log(chalk.yellow('Listening On Port ' + process.env.PORT));
});
