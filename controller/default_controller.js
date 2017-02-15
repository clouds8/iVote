'use strict'
let vote;
class DefaultController {
    constructor(Vote) {
        vote = Vote;
    }

    * defaultMethod(req, res, next) {
        let body = req.body;
        let user = {
            'account': body.account,
            'name': body.name,
            'pass': body.pass
        };
        console.log(user);
        let result = yield vote.updateUser(user);
        res.send(result);
        // res.send('default');
    }
}

module.exports = DefaultController;
