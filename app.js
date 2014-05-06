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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', app.get('port'));
});
