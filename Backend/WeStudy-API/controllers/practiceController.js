const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const Chapter = db.Chapter;
const Exercise = db.Exercise;
const DoneExercise = db.DoneExercise;

exports.createChapter = (req, res) => {
    const chapter = new Chapter({
        name: req.body.name,
        subjectId: req.body.subjectId
    });
    chapter.save((err, chapter) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Chapter was created successfully!" });
    });
}

exports.readAllChapters = (req, res) => {
    Chapter.find({ subjectId: new ObjectID(req.params.subjectId) }).exec((err, chapters) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: chapters
        });
    });
}

exports.createExercise = (req, res) => {
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

exports.readAllExercises = (req, res) => {
    Exercise.find({chapterId: req.params.chapterId, subjectId: req.params.subjectId}).exec((err, exercises) => {
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

exports.readExerciseById = (req, res) => {
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

exports.submitExercise = (req, res) => {
    DoneExercise.findOne({userId: req.userId}).exec((err, done_exercise) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (!done_exercise) {
            done_exercise = new DoneExercise({
                userId: req.userId,
                exercises: [req.params.exerciseId]
            });
        } else {
            if (!done_exercise.exercises.includes(req.params.exerciseId)) {
                done_exercise.exercises.push(req.params.exerciseId);
            }
        }
        done_exercise.save((err, data) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({ 
                status: 'success', 
                data: data.exercises
            });
        })
    });
}

exports.getAllSubmitted = (req, res) => {
    DoneExercise.findOne({userId: req.userId}).exec((err, data) => {
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
            data: data.exercises
        });
    })
}