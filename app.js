'use strict';

var express = require('express'),
    nconf = require('nconf'),
    mongoose = require('mongoose');

var app = express();

// Load configurations depending on the environment
nconf.argv().env();
nconf.defaults({
    'env': 'dev'
});
nconf.file({ file: __dirname + '/config/' + nconf.get('env') + '/config.json' });
app.secrets = require('./config/' + nconf.get('env') + '/secrets');

// Connect to mongodb
app.secrets.db = nconf.get('db:host') + ':' + nconf.get('db:port') + '/' + nconf.get('db:name');
mongoose.connect(app.secrets.db);
mongoose.connection.on('error', function() {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

app.use(app.router);
app.use(function(req, res, next) {
    res.status(404).render('404');
});

app.use(express.errorHandler());
var routes = require('./routes')(app);
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);

var server = app.listen(nconf.get('http:port'), function() {
    console.log('Listening on port %d', server.address().port);
});
