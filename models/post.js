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
    views: { type: Number, default: 1, index: true },
    city: { type: String },
    description: { type: String },
    email: { type: String, default: '' },
    replies: [{
        reply: {type: String },
        createdAt: { type: Date }
    }]
}, schemaOptions);

postSchema.virtual('url').get(function() {
    return '/city/'+this.city+'/post/'+this.id;
});

module.exports = mongoose.model("post", postSchema);
