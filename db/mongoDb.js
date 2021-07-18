const mongoose = require('mongoose');
const chalk = require('chalk');

const connection = (dbName) => {
	mongoose
		.connect(`mongodb://localhost/${dbName}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(
				chalk.cyan(
					`MongoDB Connected to ${chalk.white(dbName)} Database`
				)
			);
		})
		.catch((err) => console.log(chalk.red(err)));
};

module.exports = connection;
