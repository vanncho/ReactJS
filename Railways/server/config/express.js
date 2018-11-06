const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (app, storage) => {
    /*
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    */
    app.use(cors());

    app.use(function (req, res, next) {
        req.storage = storage;
        next();
    });

    app.use(cookieParser());
    app.use(bodyParser.json({type: '*/*'}));

    app.use(express.static('./static'));
};