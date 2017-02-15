'use strict'
const Redis = require('./redis')
const _ = require('lodash');
class User extends Redis {
    constructor() {
        super('users')
    }

    getUsers() {
        let keyword = this.KEYWORD;
        return this.getDB().smembers(keyword);
    }

    addUser(users) {
        let keyword = this.KEYWORD;
        return this.getDB().sadd(keyword, users);
    }

}
module.exports = User;
