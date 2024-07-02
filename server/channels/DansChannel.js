const Logger = require('../helpers/Logger');
const HttpService = require('../services/HttpServices');
const BusinessException = require('../exceptions/BusinessException');
const GENERAL_ERROR = 'Something went wrong';
const DEFAULT_ERROR_CODE = 500;
require('dotenv').config('../../api.env')

const getConfig = () => {
    return {
        isHttps: process.env.DANSAPI_IS_HTTPS === 'false',
        host: process.env.DANSAPI_HOST || 'dev6.dansmultipro.com',
    };
};

const getDefaultOptions = (options) => {
    const { host, port } = getConfig();
    const headers = {
        'Content-Type': 'application/json'
    };
  
    return {
        host: host,
        port: port,
        timeout: 20000,
        headers,
        ...options
    };
};

const mapHTTPErrorResponse = ({ statusCode, statusMessage }) => {
    return new BusinessException.ExceptionClass(statusCode, statusMessage || GENERAL_ERROR).dans();
};

const mapDansErrorResponse = ({ error, status }) => {
    return new BusinessException.ExceptionClass(status || DEFAULT_ERROR_CODE, error || GENERAL_ERROR).dans();
};

const parseResponse = (response, payload, resolve, reject) => {
    const { statusCode } = response || {};

    if (statusCode < 300) {
        return resolve(payload);
    } else if (payload && payload.status >= 300) {
        return reject(mapDansErrorResponse(payload));
    }

    return reject(mapHTTPErrorResponse(response));
};

module.exports = {
    get: (options) => {
        const { isHttps } = getConfig();
        options = getDefaultOptions(options);
        const url = `${(isHttps) ? 'https' : 'http'}://${options.host}${(options.port) ? ':' + options.port : ''}${options.path}`;
        Logger.info({ status: '[request, get, dansapi]', url, query: options.qs });

        return new Promise((resolve, reject) => {
            HttpService.get(isHttps, options, (err, response, payload) => {
                if (err) {
                    return reject(err);
                }
        
                parseResponse(response, payload, resolve, reject);
            });
        });
    }
};