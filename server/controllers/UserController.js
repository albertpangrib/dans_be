const BaseResponse = require("../response/BaseResponse");
const Logger = require('../helpers/Logger');
const GetUserListResponse = require("../response/GetUserListResponse");
const { User } = require('../models')

const getUserList = async (req, res) => {
    const {
        query: {
            fullName,
            username,
            email,
            createdAt
        }
    } = req;
    try {
        const result = await User.findAll({
            ...fullName && {fullName: fullName},
            ...username && {username: username},
            ...email && {email: email},
            ...createdAt && {createdAt: createdAt}
        }, null);
        const response = GetUserListResponse(result);

        Logger.info(response);
        res.send(BaseResponse.successResponse(response));
    } catch (err) {
        Logger.info(response);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

module.exports = {
    getUserList
}