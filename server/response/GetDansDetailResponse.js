const VariableCaseHelper = require('../helpers/VariableCaseHelper');

module.exports = (result) => {
    return VariableCaseHelper.keyObjectSubtitution(result) || {};
};