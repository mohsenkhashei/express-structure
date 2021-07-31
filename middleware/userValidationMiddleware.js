const { userValidatorRule } = require('../helpers/validatorRules');
const userValidation = async (req, res, next) => {
    const payload = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        telephone: req.body.telephone,
    };

    const { error } = userValidatorRule.validate(payload);
    if (error) {
        req.flash('errorMessage', error.message);
        res.redirect('register');
    } else {
        next();
    }
};

module.exports = { userValidation };
