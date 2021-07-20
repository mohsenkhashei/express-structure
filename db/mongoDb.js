const mongoose = require('mongoose');
const chalk = require('chalk');
const { MONGODB_HOST, MONGODB_PORT, MONGODB_USER, MONGODB_PASS } = process.env;

const connection = (dbName) => {
    mongoose
        .connect(
            `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${dbName}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log(
                chalk.cyan(
                    `${chalk.green("✓")} MongoDB Connected to ${chalk.white(dbName)} Database`
                )
            );
        })
        .catch((err) => console.log(chalk.red(err)));
};

module.exports = connection;
