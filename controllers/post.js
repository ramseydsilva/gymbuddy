'use strict';

var async = require('async'),
    Post = require('../models/post');

exports.new = function(req, res) {
    var post = new Post({city: req.params.city});
    var dict = {
        city: req.params.city
    };
    async.parallel({
        post: function(next) {
            if (req.method.toLowerCase() == 'post') {
                dict.error = '';
                ['title', 'email', 'description'].forEach(function(field) {
                    if (!req.body[field] && !dict.error) {
                        dict.error = field + ' is required';
                        next(null);
                    } else {
                        post[field] = req.body[field];
                    }
                });
                if (!dict.error) {
                    post.save(function(err, doc) {
                        if (err) {
                            dict.error = err;
                            next(null);
                        } else {
                            res.redirect('/city/'+req.params.city);
                        }
                    });
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
            results.post.views +=1;
            results.post.save();
            res.render('post/post', {
                post: results.post
            });
        }
    });
}
