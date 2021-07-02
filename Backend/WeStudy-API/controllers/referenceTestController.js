const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const ReferenceTest = db.ReferenceTest;

exports.create = (req, res) => {
    const referenceTest = new ReferenceTest({
        name: req.body.name,
        department_education: req.body.department_education, 
        subject: req.body.subject,
        from: req.body.from,
        photo: req.body.photo,
        file: req.body.file,
        views: 0
    });
    referenceTest.save((err, test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Reference test was created successfully!" });
    });
}

exports.readAll = (req, res) => {
    ReferenceTest.find({}).sort({created_at: -1}).exec((err, tests) => {
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
    ReferenceTest.findById(req.params.id).exec((err, test) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        test.views = test.views + 1;
        test.save((err, test) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({ 
                status: 'success', 
                data: test
            });
        })
    });
}

exports.readByLatest = (req, res) => {
    ReferenceTest.find({}).sort({created_at: -1}).limit(5).exec((err, tests) => {
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

exports.readByPopular = (req, res) => {
    ReferenceTest.find({}).sort({views: -1}).limit(10).exec((err, tests) => {
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

exports.update = () => {
    ReferenceTest.findById(req.params.id).exec((err, test) => {
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
    ReferenceTest.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success', 
            message: 'Reference test was deleted'
        })
    })
}