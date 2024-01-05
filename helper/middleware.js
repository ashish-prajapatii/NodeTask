const routeDecryptMiddlewares = (req, res, next) => {
    req.body = cryptojs.decrypt(req.body.info);
    next();
};

const responseMiddlewares = (msg, success, data, code) => {
    let obj = {};
    obj['message'] = msg;
    obj['success'] = success;
    obj['data'] = data;
    obj['success_code'] = code;
    return obj;
};

module.exports = { responseMiddlewares, routeDecryptMiddlewares };