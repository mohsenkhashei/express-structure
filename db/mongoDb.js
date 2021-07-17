const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.Promise = global.Promise;

mongoose
	.connect(`mongodb://localhost/${process.env.DBNAME}`, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log(chalk.cyan('Mongo Connected'));
	})
	.catch((err) => {
		console.log(chalk.red(err));
	});

module.exports = mongoose;
