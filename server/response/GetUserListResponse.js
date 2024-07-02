const _ = require('lodash');

module.exports = (result) => {
    return _.map(result, item => ({
        id: item.id,
        username: item.username,
        fullName: item.fullName,
        email: item.email,
        createdAt: item.createdAt
    }));
};