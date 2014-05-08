'use strict';

var mongoose = require('mongoose'),
    slug = require('slug'),
    async = require('async');

var schemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var citySchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true },
    slug: { type: String, index: true, unique: true },
    views: { type: Number, default: 1, index: true },
    location: {
        longitude: String,
        latitude: String
    }
}, schemaOptions);

citySchema.virtual('url').get(function() {
    return '/city/'+this.slug;
});

citySchema.pre('save', function(next) {
    if (this.name && !this.slug) {
        this.slug = slug(this.name.toLowerCase());
    }
    next();
});

module.exports = mongoose.model("city", citySchema);
