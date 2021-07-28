const httpError = require('http-errors');
const flash = require('connect-flash');

const passport = require('passport');
const User = require('../models/user');

module.exports = {
    path: '/',
    config: (router) => {
        router
            .get('/', (req, res, next) => {
                res.render('home');
            })
            .get('/userprofile', isLoggedIn, (req, res, next) => {
                res.render('userprofile');
            })

            //register
            .get('/register', (req, res) => {
                res.render('register');
            })
            .post('/register', (req, res, next) => {
                User.register(
                    new User({
                        username: req.body.username,
                        phone: req.body.phone,
                        telephone: req.body.telephone,
                    }),
                    req.body.password,
                    (err, user) => {
                        if (err) {
                            res.render('register', {
                                errorMessage: err.message,
                            });
                        }
                        passport.authenticate('local')(req, res, () => {
                            res.redirect('/login');
                        });
                    }
                );
            });

        //Login Route
        router.get('/login', (req, res) => {
            res.render('login', { errorMessage: req.flash('errorMessage') });
        });
        // ##########################################################################
        router.post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('errorMessage', 'User Not Found!');
                    return res.redirect('/login');
                }
                req.logIn(user, (loginErr) => {
                    if (loginErr) {
                        return next(loginErr);
                    }
                    res.redirect('/userprofile');
                });
            })(req, res, next);
        });
        // ###############################################################################
        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        return router;
    },
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
