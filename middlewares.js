'use strict';

exports.json = function(req, res, next) {
    if (req.query.format == 'json') {
        res.render = res.json
    }
    next();
}
