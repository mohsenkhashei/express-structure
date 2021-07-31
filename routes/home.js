const { profile, index } = require('../controllers/homeController');
const { isLoggedIn } = require('../middleware/authMiddleware');
module.exports = {
    path: '/home',
    config: (router) => {
        router.use(isLoggedIn);
        router.get('/userprofile', profile);
        router.get('/index', index);

        return router;
    },
};
