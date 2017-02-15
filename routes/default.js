'use strict'
const co = Promise.coroutine;
const express = require('express');
let router = express.Router();

module.exports = function (jsonParser, defaultController) {
    router.post('/', jsonParser, co(defaultController.defaultMethod));
    return router;
};
