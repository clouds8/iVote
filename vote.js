'use strict'
Promise = require('bluebird');
const express = require('express');
const app = express();
const config = require('./config');

//Middleware
const errorHandler = require('./middleware/error_handler');
const jsonParser = require('body-parser').json();

//Model
const Redis = require('./model/redis');
const Sprint = require('./model/sprint');
const User = require('./model/user');

//init Model
let redis = new Redis();
let sprint = new Sprint();
let user = new User();

//Controller
const DefaultController = require('./controller/default_controller');
const SprintController = require('./controller/sprint_controller');
const UserController = require('./controller/user_controller');

//init Controller
let defaultController = new DefaultController(redis);
let sprintController = new SprintController(sprint, user);
let userController = new UserController(user);

//Router
const defaultRouter = require('./routes/default');
const sprintRouter = require('./routes/sprint');
const userRouter = require('./routes/user');

app.get('/', function (req, res) {
    res.send("hello world")
});

app.use('/default', defaultRouter(jsonParser, defaultController));
app.use('/sprints', sprintRouter(jsonParser, sprintController));
app.use('/users', userRouter(jsonParser, userController));

//default error handler
app.use(errorHandler);

app.listen(config.app.port, function () {
    console.log('working');
})
