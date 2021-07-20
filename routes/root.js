const httpError = require('http-errors');
module.exports = {
    path: '/',
    config: (router) => {
        router
            .get('/', (req, res, next) => {
                if (req.hasOwnProperty('session')) {
                    return res.redirect('/home');
                }
                // next(httpError('404', 'this is the test'));
                res.render('index', { title: 'Express' });
            })
            .get('/test', (req, res, next) => {});
        return router;
    },
};
