const { mainPage } = require('../controllers/rootController');

module.exports = {
    path: '/',
    config: (router) => {
        //index
        router.get('/', mainPage);

        return router;
    },
};
