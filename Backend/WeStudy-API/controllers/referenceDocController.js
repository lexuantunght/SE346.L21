const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const ReferenceDoc = db.ReferenceDoc;

exports.create = (req, res) => {
    const referenceDoc = new ReferenceDoc({
        name: req.body.name,
        subject: req.body.subject,
        from: req.body.from,
        photo: req.body.photo,
        file: req.body.file,
        views: 0
    });
    referenceDoc.save((err, doc) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Reference document was created successfully!" });
    });
}

exports.readAll = (req, res) => {
    ReferenceDoc.find({}).sort({views: -1}).exec((err, docs) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: docs
        });
    });
}

exports.readById = (req, res) => {
    ReferenceDoc.findById(req.params.id).exec((err, doc) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        doc.views = doc.views + 1;
        doc.save((err, doc) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({ 
                status: 'success', 
                data: doc
            });
        });
    });
}

exports.readByLatest = (req, res) => {
    ReferenceDoc.find({}).sort({created_at: -1}).limit(5).exec((err, docs) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: docs
        });
    });
}

exports.readByPopular = (req, res) => {
    ReferenceDoc.find({}).sort({views: -1}).limit(10).exec((err, docs) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: docs
        });
    });
}

exports.update = () => {
    ReferenceDoc.findById(req.params.id).exec((err, doc) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        Object.assign(doc, req.body);
        doc.save(function(err, doc) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: doc
            });
        });
    })
}

exports.delete = () => {
    ReferenceDoc.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success', 
            message: 'Reference document was deleted'
        })
    })
}