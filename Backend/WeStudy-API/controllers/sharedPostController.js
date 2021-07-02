const db = require('../utils/db');
var ObjectID = require('mongoose').Types.ObjectId;
var fs = require('fs');
var path = require('path');
const SharedPost = db.SharedPost;

exports.create = (req, res) => {
    const sharedPost = new SharedPost({
        name: req.body.name,
        author: req.body.author,
        from: req.body.from,
        photo: req.body.photo,
        content: req.body.content, //html
        views: 0
    });
    sharedPost.save((err, post) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ status: 'success', message: "Shared post was created successfully!" });
    });
}

exports.readAll = (req, res) => {
    SharedPost.find({}, { content: 0 }).sort({views: -1}).exec((err, posts) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: posts
        });
    });
}

exports.readById = (req, res) => {
    SharedPost.findById(req.params.id).exec((err, post) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        post.views = post.views + 1;
        post.save((err, post) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({ 
                status: 'success', 
                data: post
            });
        });
    });
}

exports.readByLatest = (req, res) => {
    SharedPost.find({}, { content: 0 }).sort({created_at: -1}).limit(5).exec((err, posts) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({ 
            status: 'success', 
            data: posts
        });
    });
}

exports.update = () => {
    SharedPost.findById(req.params.id).exec((err, post) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        Object.assign(post, req.body);
        post.save(function(err, post) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: post
            });
        });
    })
}

exports.delete = () => {
    SharedPost.remove({_id: req.params.id}).exec((err) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success', 
            message: 'Shared post was deleted'
        })
    })
}