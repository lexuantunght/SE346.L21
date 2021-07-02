const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const Subject = db.Subject;
const DepartmentEducation = db.DepartmentEducation;
const University = db.University;
const Role = db.Role;

exports.createSubject = (req, res) => {
    const subject = new Subject({
        name: req.body.name,
        photo: req.body.photo
    });
    subject.save((err, subject) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Subject was created successfully!" });
    });
}

exports.readAllSubject = (req, res) => {
    Subject.find({}).exec((err, subjects) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: subjects
        });
    });
}

exports.createDepartmentEducation = (req, res) => {
    const departmentEducation = new DepartmentEducation({
        name: req.body.name
    });
    departmentEducation.save((err, departmentEducation) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Department education was created successfully!" });
    });
}

exports.readAllDepartmentEducation = (req, res) => {
    DepartmentEducation.find({}).exec((err, departmentEducations) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: departmentEducations
        });
    });
}

exports.createUniversity = (req, res) => {
    const university = new University({
        name: req.body.name,
        admission: req.body.admission,
        base_mark: req.body.base_mark,
        majors: req.body.majors
    });
    university.save((err, university) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "University was created successfully!" });
    });
}

exports.readAllUniversity = (req, res) => {
    University.find({}, { base_mark: 0, admission: 0, majors: 0 }).exec((err, universities) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: universities
        });
    });
}

exports.readBaseMark = (req ,res) => {
    University.findById(req.params.id, { majors: 0, admission: 0 }).exec((err, university) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: university
        });
    });
}

exports.readAddmission = (req ,res) => {
    University.findById(req.params.id, { majors: 0, base_mark: 0 }).exec((err, university) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: university
        });
    });
}

exports.readUniversityByMajor = (req, res) => {
    University.find({}, { admission: 0, base_mark: 0 } ).exec((err, universities) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        let temp = [];
        for (let i = 0; i < universities.length; i++) {
            for (let j = 0; j < universities[i].majors.length; j++) {
                if (universities[i].majors[j].toLowerCase().startsWith(req.body.major.toLowerCase())) {
                    temp.push({
                        'name': universities[i].name,
                        'major': universities[i].majors[j]
                    });
                }
            }
        }
        res.status(200).send({ 
            status: 'success', 
            data: temp
        });
    });
}

exports.addRole = (req, res) => {
    const role = new Role({
        name: req.body.name,
        users: []
    });
    role.save((err, role) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Role was created successfully!" });
    });
}