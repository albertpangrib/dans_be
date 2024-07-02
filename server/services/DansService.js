const DansChannel = require('../channels/DansChannel');
const { getQueryString } = require('../helpers/QueryParamsHelper');

const dansUrls = {
    LIST: '/api/recruitment/positions.json',
    DETAIL: '/api/recruitment/positions'
};

const getDansList = (payload) => {
    const { description, location, full_time, page } = payload;

    const queryParams = {
        description: description,
        location: location,
        full_time: full_time,
        page: page
    };

    const options = {
        path: dansUrls.LIST,
        qs: getQueryString(queryParams)
    };

    return DansChannel.get(options);
};

const getDansDetail = (id) => {
    const options = {
        path: `${dansUrls.DETAIL}/${id}`
    };

    return DansChannel.get(options);
};

module.exports = {
    getDansList: getDansList,
    getDansDetail: getDansDetail
};