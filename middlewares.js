'use strict';

exports.json = function(req, res, next) {
    if (req.query.format == 'json') {
        res.render = function(status_code, dict) {
            res.json(this.statusCode, dict);
        }
    }
    next();
}
