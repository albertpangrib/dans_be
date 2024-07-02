const { isEmpty } = require('lodash');
const VariableCaseHelper = require('../helpers/VariableCaseHelper');

const checkResult = (result) => {
    const finalRes = [];
    
    for (const data of result) {
        if (!isEmpty(data)) {
            finalRes.push(data);
        }
    }

    return finalRes;
};

module.exports = (result) => {
    return VariableCaseHelper.keyArrayObjectSubtitution(checkResult(result)) || [];
};