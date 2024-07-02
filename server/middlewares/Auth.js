const jwt = require('jsonwebtoken');
const { User } = require('../models');
const BaseResponse = require('../response/BaseResponse');
require('dotenv').config('../../api.env')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ id: decoded.id, token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send(BaseResponse.errorResponse('Please authenticate.'));
    }
};

module.exports = auth;