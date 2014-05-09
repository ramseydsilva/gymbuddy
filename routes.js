'use strict';

var homeController = require('./controllers/home'),
    cityController = require('./controllers/city'),
    postController = require('./controllers/post'),
    middlewares = require('./middlewares');

module.exports = function(app) {
    app.get('/*', middlewares.json);
    app.post('/*', middlewares.json);
    app.get('/', homeController.home);
    app.get('/city/all', cityController.all);
    app.get('/city/new', cityController.new);
    app.post('/city/new', cityController.new);
    app.get('/city/:city', cityController.city);
    app.get('/city/:city/post/new', postController.new);
    app.post('/city/:city/post/new', postController.new);
    app.get('/city/:city/post/:post', postController.post);
    app.post('/city/:city/post/:post', postController.postReply);
}
