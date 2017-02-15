'use strict'
const co = Promise.coroutine;
const express = require('express');
let router = express.Router();

module.exports = function (jsonParser, sprintController) {
    router.post('/scores/:id', jsonParser, co(sprintController.addScore));
    router.get('/:id', co(sprintController.getSprintScores));
    return router;
};
