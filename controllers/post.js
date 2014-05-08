'use strict';

var async = require('async'),
    Post = require('../models/post');

exports.new = function(req, res) {
    var post = new Post();
    var dict = {
        city: req.params.city
    };
    async.parallel({
        post: function(next) {
            if (req.method.toLowerCase() == 'post') {
                dict.error = '';
                if (!req.body.description) {
                    dict.error = 'Description is required';
                } else {
                    post.description = req.body.description;
                }
                if (!req.body.title) {
                    dict.error = 'Title is required';
                } else {
                    post.title = req.body.title;
                }
                if (!dict.error) {
                    Post.create({title: req.body.title, description: req.body.description, city: req.params.city}, function(err, doc) {
                        if (err) {
                            dict.error = err;
                            next(null);
                        } else {
                            res.redirect('/city/'+req.params.city);
                        }
                    });
                } else {
                    next(null);
                }
            } else {
                next(null);
            }
        }
    }, function(err, results) {
        dict.post = post;
        res.render('post/new', dict);
    });
}

exports.post = function(req, res) {
    async.parallel({
        post: function(next) {
            Post.findOne({_id: req.params.post}, next);
        }
    }, function(err, results) {
        if (!results.post) {
            res.render(404);
        } else {
            res.render('post/post', {
                post: results.post
            });
        }
    });
}
