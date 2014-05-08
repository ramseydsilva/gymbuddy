'use strict';

var mongoose = require('mongoose'),
    slug = require('slug'),
    async = require('async');

var schemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var postSchema = new mongoose.Schema({
    title: { type: String, index: true, default: '' },
    hits: { type: Number, default: 1, index: true },
    city: { type: String },
    description: { type: String }
}, schemaOptions);

module.exports = mongoose.model("post", postSchema);
