const httpError = require('http-errors');
// const users = require('./users');
// const User = require('../models/users');
module.exports = {
    path: '/',
    config: (router) => {
        router
            .get('/', (req, res, next) => {
                console.log(process.env.PORT);
                res.send('root');
                // next(httpError('404', 'this is the test'));
                // res.render('index', { title: 'Express' });
            })
            .get('/test', (req, res, next) => {
                // User.test();
                const multi = (...num) => {
                    num.map((index, value) => {
                        console.log(index);
                        console.log(value);
                    });
                };
                res.send(multi(1, 2));
            });
        return router;
    },
};
