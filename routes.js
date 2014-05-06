'use strict';

var homeController = require('./controllers/home'),
    middlewares = require('./middlewares');

module.exports = function(app) {
    app.get('/*', middlewares.json);
    app.get('/', homeController.home);
}
