const User = require('../models/user');
const httpError = require('http-errors');
const passport = require('passport');
const viewPath = 'user/';
// ########################REGISTER#######################################################
const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username,
        }).lean(true);
        if (existingUser) {
            return httpError(403, 'User already exists');
        } else {
            User.register(
                new User({
                    username: req.body.username,
                    phone: req.body.phone,
                    telephone: req.body.telephone,
                }),
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.render(viewPath + 'register', {
                            errorMessage: err.message,
                        });
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/user/login');
                    });
                }
            );
        }
    } catch (error) {
        return httpError(400, 'Error in registering user');
    }
};
const registerPage = (req, res) => {
    res.render(viewPath + 'register', {
        errorMessage: req.flash('errorMessage'),
        csrfToken: req.csrfToken(),
    });
};

// ########################LOGIN#######################################################
const loginPage = (req, res) => {
    res.render(viewPath + 'login', {
        errorMessage: req.flash('errorMessage'),
        csrfToken: req.csrfToken(),
    });
};
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('errorMessage', 'User Not Found!');
            return res.redirect('/user/login');
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            res.redirect('/home/userprofile');
        });
    })(req, res, next);
};
const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = {
    register,
    registerPage,
    loginPage,
    login,
    logout,
};
