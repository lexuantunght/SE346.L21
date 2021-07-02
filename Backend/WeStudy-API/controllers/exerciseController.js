const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const Exercise = db.Exercise;

exports.create = (req, res) => {
    const exercise = new Exercise({
        chapterId: req.body.chapterId,
        subjectId: req.body.subjectId,
        content: req.body.content,
        photos: req.body.photos,
        answers: req.body.answers,
        key: req.body.key,
        detail_key: req.body.detail_key
    });
    exercise.save((err, exercise) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Exercise was created successfully!" });
    });
}

exports.readAll = (req, res) => {
    Exercise.find({}).exec((err, exercises) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: exercises
        });
    });
}

exports.readById = (req, res) => {
    Exercise.findById(req.params.id).exec((err, exercise) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: exercise
        });
    });
}

exports.update = () => {
    Exercise.findById(req.params.id).exec((err, exercise) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        Object.assign(exercise, req.body);
        exercise.save(function(err, exercise) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: exercise
            });
        });
    })
}

exports.delete = () => {
    Exercise.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success', 
            message: 'Exercise was deleted'
        })
    })
}