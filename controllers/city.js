'use strict';

var async = require('async'),
    Post = require('../models/post'),
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

exports.city = function(req, res) {
    async.parallel({
        city: function(next) {
            City.findOne({slug: req.params.city}, next);
        },
        posts: function(next) {
            Post.find({city: req.params.city}, next);
        }
    }, function(err, results) {
        if (!results.city) {
            res.render(404);
        } else {
            res.render('city/city', {
                city: results.city,
                posts: results.posts
            });
        }
    });
}
