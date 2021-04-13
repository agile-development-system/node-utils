const request = require('request');

class Request {
    get(url, params = {}, options = {}) {
        const keys = Object.keys(params);
        url = url + `${keys.length > 0 ? '?' : ''}${query2Search(params)}`;
        options = {
            ...options,
            url,
        };

        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                if (err) {
                    return reject(err);
                }
                resolve(response.body);
            });
        });
    }
}

/**
 * query转search
 * @param {*} query
 */
function query2Search(query) {
    const kvs = [];
    for (let k in query) {
        kvs.push(`${k}=${restoreSearchifyValue(query[k])}`);
    }
    return kvs.join('&');
}

/**
 * 还原searchify的值
 * @param {*} val
 */
function restoreSearchifyValue(val) {
    if (typeof val === 'string' && val.indexOf('Asp,Asp') > -1) {
        return val.split('Asp,Asp').filter(n => n);
    }
    return val;
}

const myRequest = new Request();

module.exports = myRequest;
