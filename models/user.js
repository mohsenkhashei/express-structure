const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    passport: String,
    phone: Number,
    telephone: Number,
});
var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError:
            'Account locked due to too many failed login attempts',
        NoSaltValueStoredError:
            'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered',
    },
};
UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema);
