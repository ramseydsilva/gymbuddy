'use strict';

var homeController = require('./controllers/home'),
    cityController = require('./controllers/city'),
    middlewares = require('./middlewares');

module.exports = function(app) {
    app.get('/*', middlewares.json);
    app.post('/*', middlewares.json);
    app.get('/', homeController.home);
    app.get('/cities', cityController.all);
    app.get('/cities/new', cityController.new);
    app.post('/cities/new', cityController.new);
}
