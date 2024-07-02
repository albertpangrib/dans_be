const AuthService = require('../services/AuthService')
const BaseResponse = require('../response/BaseResponse')
const Logger = require('../helpers/Logger')
const { User } = require('../models')

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AuthService.login({ username, password });
        const token = await User.generateAuthToken(user.id);

        Logger.info(token);
        res.setHeader('Authorization', `Bearer ${token}`).send(BaseResponse.successResponse({ token }));
    } catch (err) {
        Logger.error(err)
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

module.exports = {
    login,
}