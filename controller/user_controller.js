'use strict'
let user;
class UserController {
    constructor(User) {
        user = User;
    }
    * addUser(req, res, next) {
        let body = req.body;
        let users = body.users;
        yield user.addUser(users);
        res.send({
            message: "success"
        });
    }

}
module.exports = UserController
