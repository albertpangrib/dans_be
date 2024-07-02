const querystring = require('querystring');

module.exports = {
    getQueryString: (queries) => {
        let newQueries = {};
        
        for (const key in queries) {
            if (queries[key] !== "" && queries[key] !== null && queries[key] !== undefined) {
                newQueries[key] = queries[key];
            }
        }

        return querystring.stringify(newQueries);
    }
};
