'use strict';

var express = require('express');
var app = express();

app.use(app.router);
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
app.use(express.errorHandler());
var routes = require('./routes')(app);
app.set('view engine', 'jade');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
