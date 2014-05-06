'use strict';

var async = require('async'),
    City = require('../models/city');

exports.all = function(req, res) {
    async.parallel({
        cities: function(next) {
            City.find({}, next);
        }
    }, function(err, results) {
        res.render('city/all', {
            cities: results.cities
        });
    });
}

exports.new = function(req, res) {
    if (!!req.body.city) {
        var city = City.create({name: req.body.city}, function(err, doc) {
            if (err) {
                if (err.code == 11000) {
                    err = 'City already exists';
                }
                res.render('city/new', {
                    error: err,
                    city: req.body.city
                });
            } else {
                res.redirect('/cities');
            }
        });
    } else {
        res.render('city/new', {
        });
    }
}
