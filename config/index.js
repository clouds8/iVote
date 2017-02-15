'use strict'
const _ = require('lodash');
const app = require('./app.json');

let appConfig = {
    db: {
		host: app.db.host || "localhost",
		user: app.db.user,
		password: app.db.password || '',
		port: app.db.port || 3306,
		database: app.db.database || "db_seed",
		driver: app.db.driver
	},
    mongo: {
		hosts: app.mongo.hosts,
		user: app.mongo.user || '',
		password: app.mongo.password || '',
		database: app.mongo.database || '',
		options: app.mongo.options || ''
	},
    redis: {
		host: app.redis.host,
		port: app.redis.port,
		family: app.redis.family,
		db: app.redis.db
	},
	port: app.port || 4000
}

module.exports = {
	app: _.clone(appConfig)
}
