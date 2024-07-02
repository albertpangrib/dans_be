const { User } = require('../models');
const BusinessException = require('../exceptions/BusinessException');
const PasswordHelper = require('../helpers/PasswordHelper');

const login = async (payload) => {
    const username = payload && payload.username;
    const password = payload && payload.password;

    const user = await User.findByCredentials(username);
    if (!user || user.length === 0) {
        throw BusinessException.notFound('user');
    }

    const salt = user.dataValues.salt;
    const hashedPassword = user.dataValues.password;

    const isValidPassword = PasswordHelper.isValid(salt, hashedPassword, password);

    return {
        isLoggedIn: isValidPassword,
        id: user.dataValues.id
    };
};

module.exports = {
    login: login
};