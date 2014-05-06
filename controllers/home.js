'use strict';

var async = require('async'),
    City = require('../models/city');

exports.home = function(req, res) {
    async.parallel({
        cities: function(next) {
            City.find({}, next);
        }
    }, function(err, results) {
        res.render('home', {
            cities: results.cities
        });
    });
};
