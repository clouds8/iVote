'use strict'
const _ = require('lodash');
let sprint;
let user;
class SprintController {
    constructor(Sprint, User) {
        sprint = Sprint;
        user = User;
    }

    * addScore(req, res, next) {
        let body = req.body;
        let sprint_id = req.params.id;
        let tasks = body.tasks;
        let user_name = body.user;
        let result = yield sprint.addScore(user_name, sprint_id, tasks);
        res.send(result);
    }

    * getSprintScores(req, res, next) {
        let sprint_id = req.params.id;
        let tasks = yield sprint.findTasks(sprint_id);
        let users = yield user.getUsers();

        let promiseArray = [];
        tasks.forEach(function (task_id) {
            promiseArray.push(sprint.findScores3(sprint_id, task_id, users));
        })
        let scores = yield Promise.all(promiseArray);
        // console.log(scores);
        res.send(scores);
    }
}

module.exports = SprintController;
