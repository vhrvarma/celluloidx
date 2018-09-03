let config = require('./server/config/config');

let express = require('express');

let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');

let routes = require('./server/routes/routes');

let chalk = require('chalk');

let app = express();

let mongoose = require('mongoose');



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype,token');

    // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    }
    else {
        // Pass to next layer of middleware
        next();
    }
});

require('./server/config/libs/mongoose');

app.listen(config.port);

app.use('/v1',routes);

console.log(chalk.green('Server started on port : ' + config.port + " with " + process.env.NODE_ENV + ' mode'));

module.exports = app;