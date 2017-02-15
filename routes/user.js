'use strict'
const co = Promise.coroutine;
const express = require('express');
let router = express.Router();

module.exports = function (jsonParser, userController) {
    router.post('/', jsonParser, co(userController.addUser));
    return router;
};
