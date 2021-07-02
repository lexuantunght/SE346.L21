const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const Test = db.Test;
const DoneTest = db.DoneTest;
const User = db.User;

exports.create = (req, res) => {
    const test = new Test({
        subjectId: req.body.subjectId,
        code: req.body.code,
        from: req.body.from,
        time_doing: req.body.time_doing,
        questions: req.body.questions, //html
        key_file: req.body.key_file
    });
    test.save((err, test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Test was created successfully!" });
    });
}

exports.readAll = (req, res) => {
    Test.find({subjectId : req.params.subjectId}, { questions: 0, key_file: 0 }).exec((err, tests) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: tests
        });
    });
}

exports.readById = (req, res) => {
    Test.findById(req.params.id).exec((err, test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: test
        });
    });
}

exports.submit = (req, res) => {
    DoneTest.findOne({userId: req.userId}).exec((err, done_test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (!done_test) {
            done_test = new DoneTest({
                userId: req.userId,
                tests: [req.body]
            });
        } else {
            if (!done_test.tests.includes(req.body)) {
                done_test.tests.push(req.body);
            }
        }
        done_test.save((err, data) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({ 
                status: 'success', 
                data: data.tests
            });
        })
    })
}

exports.getAllSubmitted = (req, res) => {
    DoneTest.findOne({userId: req.userId}).exec((err, data) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (!data) {
            res.status(200).send({ 
                status: 'success', 
                data: []
            });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: data.tests
        });
    })
}

exports.getSubmittedById = (req, res) => {
    DoneTest.findOne({userId: req.userId}).exec((err, data) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (!data) {
            res.status(200).send({ 
                status: 'success', 
                data: null
            });
            return;
        }
        let index = data.tests.findIndex(e => e.testId === req.params.id);
        if (index >= 0) {
            res.status(200).send({ 
                status: 'success', 
                data: data.tests[index]
            });
        } else {
            res.status(200).send({ 
                status: 'success', 
                data: null
            });
        }
    })
}

exports.getRanking = (req, res) => {
    DoneTest.find({}).exec((err, done_tests) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        let temp = [];
        let name = [];
        for (let i = 0; i < done_tests.length; i++) {
            for (let j = 0; j < done_tests[i].tests.length; j++) {
                if (done_tests[i].tests[j].subjectId === req.params.subjectId && done_tests[i].tests[j].testId === req.params.testId) {
                    temp.push({
                        userId: done_tests[i].userId,
                        mark: done_tests[i].tests[j].mark
                    });
                    name.push(done_tests[i].userId);
                }
            }
        }
        User.find({_id: { $in: name }}).exec((err, users) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            let result = [];
            for (let i = 0; i < temp.length; i++) {
                let nameUser = users[0].name;
                for (let j = 0; j < users.length; j++) {
                    if (users[j]._id == temp[i].userId) {
                        nameUser = users[j].name;
                        break;
                    }
                }
                result.push({
                    userId: temp[i].userId,
                    name: nameUser,
                    mark: temp[i].mark
                })
            }
            res.status(200).send({ 
                status: 'success', 
                data: result
            });
        })
    })
}

exports.update = () => {
    Test.findById(req.params.id).exec((err, test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        Object.assign(test, req.body);
        test.save(function(err, test) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: test
            });
        });
    })
}

exports.delete = () => {
    Test.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success', 
            message: 'Test was deleted'
        })
    })
}