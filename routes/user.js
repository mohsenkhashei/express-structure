const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const {
    register,
    registerPage,
    loginPage,
    login,
    logout,
} = require('../controllers/userController');
const { userValidation } = require('../middleware/userValidationMiddleware');

module.exports = {
    path: '/user',
    config: (router) => {
        //register
        router.get('/register', csrfProtection, registerPage);
        router.post('/register', userValidation, csrfProtection, register);

        //Login Route
        router.get('/login', csrfProtection, loginPage);
        router.post('/login', csrfProtection, login);
        router.get('/logout', logout);

        return router;
    },
};
