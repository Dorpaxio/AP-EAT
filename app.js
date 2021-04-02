const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const errorHandler = require('./lib/ErrorHandlerMiddleware');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AP-EAT",
            version: "1.0.0",
            description: "API pour services de livraison de nourriture.",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Dorpaxio",
                url: "https://dorpax.io",
                email: "dorpaxione@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:29321/v1",
            },
        ],
    },
    apis: [
        './api/v1/routes/index.js',
        './api/v1/routes/*/index.js'
    ],
};

app.use(
    "/v1/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions))
);

app.use(require('helmet')());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});
app.use(express.json());
app.set('json spaces', 4);

// -- CSRF --
app.use(cookieParser());
/*app.use(csrf({cookie: true}));
app.get('/', function (req, res) {
   res.cookie('XSRF-TOKEN', req.csrfToken(), {sameSite: 'lax'});
   res.status(200).json({
       message: `Version disponible : v1`
   });
});*/
// --

app.use(errorHandler);

app.use('/v1', require('./api/v1/routes'));

mongoose.connect(`mongodb://localhost/${config.database}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    function (error) {
        if (error) throw error;
        console.log(`Mongoose has been successfully started. (DB=${config.database})`);
    });

module.exports = app;
