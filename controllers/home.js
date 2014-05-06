'use strict';

exports.home = function(req, res) {
    res.render('home', {
        cities: [{ 
            name: 'Toronto',
            slug: 'toronto'
        }]
    });
};
