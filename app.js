var express = require('express');
//var mongoose = require('mongoose');

var selfquiz = express();

// default file send options for static middleware
selfquiz.locals.sendFileOptions = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-sent': true,
    },
};

/*
 * Middleware
 */

// Serve up static files like CSS, Client-side JS, and images
selfquiz.use('/p', express.static('public'));
selfquiz.use('/n', express.static('node_modules'));
// Application home page
selfquiz.get('/', function(req, res)
{
    res.sendFile('public/index.html', selfquiz.locals.sendFileOptions);
});

/*
 * Start server
 */
 var port = process.env.port || 8000;
selfquiz.listen(port);
console.log("SelfQuiz Application started. Server listening on port " + port.toString());
