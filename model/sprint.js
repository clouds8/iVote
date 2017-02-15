'use strict'
const Redis = require('./redis')
const _ = require('lodash');
const co = Promise.coroutine;
class Sprints extends Redis {
    constructor() {
        super('sprints')
    }

    insertToList(num) {
        return this.getDB().lpush(this.KEYWORD, num);
    }

    insertToHash(sprint) {
        return this.getDB().hmset(`${this.KEYWORD}:${sprint.num}`, sprint);
    }

    addScore(user_name, sprint_id, tasks) {

        let pipeline = this.getDB().pipeline();
        let keyword = this.KEYWORD;

        _.forIn(tasks, function (score, index) {
            pipeline.zadd(`${keyword}:${sprint_id}:${index}`, score, user_name);
            pipeline.sadd(`${keyword}:${sprint_id}`, index);
        })

        return pipeline.exec();
    }

    findTasks(sprint_id) {
        let keyword = this.KEYWORD;
        return this.getDB().smembers(`${keyword}:${sprint_id}`);
    }

    // findTaskScore(tasks) {
    //     let collection = [];
    //     let pipeline = this.getDB().pipeline();
    //     tasks.forEach(function (task_id) {
    //
    //     })
    // }

    findScores(sprint_id, task_id) {
        let keyword = this.KEYWORD;
        return this.getDB().zrange(`${keyword}:${sprint_id}:${task_id}`, 0, -1, 'WITHSCORES')
    }

    findScores2(sprint_id, task_id, users) {
        let keyword = this.KEYWORD;
        let pipeline = this.getDB().pipeline();
        return co(function *() {
            users.forEach(function (user_id) {
                pipeline.zscore(`${keyword}:${sprint_id}:${task_id}`, user_id)
            })
            let scores = yield pipeline.exec();
            console.log(JSON.stringify(scores));
            let result = {};
            result[`${keyword}:${sprint_id}:${task_id}`] = scores;
            console.log(result);
            return result;
        })();
    }

    findScores3(sprint_id, task_id, users) {
        let keyword = this.KEYWORD;
        let pipeline = this.getDB().pipeline();
        return co(function *() {
            users.forEach(function (user_id) {
                pipeline.zscore(`${keyword}:${sprint_id}:${task_id}`, user_id)
            })
            let scores = yield pipeline.exec();
            // console.log(JSON.stringify(scores));
            let result = {};
            let numbers = [];
            scores.forEach(function (score) {
                if (score[0] === null && score[1] !== null) {
                    numbers.push(score[1])
                }
            })
            numbers = _.map(numbers, _.parseInt);
            let mean = _.mean(numbers);
            let max = _.max(numbers);
            let min = _.min(numbers);
            result = {
                name: `${keyword}:${sprint_id}:${task_id}`,
                mean: mean,
                max: max,
                min: min,
                scores: numbers
            }
            // result[`${keyword}:${sprint_id}:${task_id}`] = scores;
            // console.log(result);
            return result;
        })();
    }

}

module.exports = Sprints;
