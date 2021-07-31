const viewPath = 'home/';

const profile = (req, res, next) => {
    res.render(viewPath + 'userprofile');
};

const index = (req, res, next) => {
    if (typeof req.session.passport.user != 'undefined') {
        res.render(viewPath + 'index', { username: req.session.passport.user });
    } else {
        redirect('/logout');
    }
};
module.exports = {
    profile,
    index,
};
