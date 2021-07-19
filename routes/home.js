const path = '/home/test/api';
const { isAuthenticated } = require('../helpers/auth');
const config = (router) => {
    router
        // .use(isAuthenticated)
        .get('/', (req, res) => {
            // res.render('home', {
            // 	user: req.user,
            // });
            res.send('home');
        })
        .post('/', (req, res) => res.send('POST'));
    return router;
};

module.exports = {
    path,
    config,
};
