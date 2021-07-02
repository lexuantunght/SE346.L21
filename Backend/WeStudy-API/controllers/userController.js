const config = require('../config/auth.config');
const db = require('../utils/db');
var fs = require('fs');
var path = require('path');
const User = db.User;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (user) {
            res.send({ status: 'fail', message: "Tài khoản đã tồn tại!" });
            fs.rmSync(path.join(__dirname + '/../uploads/avatars/' + req.file.filename));
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                school: req.body.school,
                avatar: config.host + '/static/avatars/' + (req.file ? req.file.filename : 'default.png'),
                password: bcrypt.hashSync(req.body.password, 8)
            });
        
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({ status: 'fail', message: err });
                    return;
                }
                res.send({ status: 'success', message: "User was registered successfully!" });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ status: 'fail', message: "Tài khoản không tồn tại!" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                status: 'fail',
                accessToken: null,
                message: "Mật khẩu không chính xác!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 * 7 * 1000 // 7 days
        });

        res.status(200).send({
            status: 'success',
            data: {
                id: user._id,
                email: user.email,
                username: user.username,
                school: user.school,
                name: user.name,
                avatar: user.avatar,
                accessToken: token
            }
        });
    });
};

exports.signinByOthers = (req, res) => {
    User.findOne({ username: req.user.id }).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }

        if (user) {
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 * 7 * 1000 // 7 days
            });
            res.cookie('token', token, {
                maxAge: 86400 * 7 * 1000, // Lifetime
                domain: config.domain
            });
            return res.redirect(config.frontend);
        }
        user = new User({
            name: req.user.displayName,
            email: req.user.emails[0].value,
            username: req.user.id,
            school: 'Chưa xác định',
            avatar: (req.user.photos.length > 0 ? req.user.photos[0].value : config.host + '/static/avatars/default.png'),
            password: ''
        });
        user.save((err, user) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 * 7 * 1000 // 7 days
            });
            res.cookie('token', token, {
                maxAge: 86400 * 7 * 1000, // Lifetime
                domain: config.domain
            });
            res.redirect(config.frontend);
        });
    })
}

exports.current = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        res.status(200).send({
            status: 'success',
            data: user
        });
    }) 
};

exports.update = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        if (req.body.oldPassword && req.body.password) {
            var passwordIsValid = bcrypt.compareSync(
                req.body.oldPassword,
                user.password
            );
    
            if (!passwordIsValid) {
                return res.status(401).send({
                    status: 'fail',
                    message: "Mật khẩu cũ không chính xác!"
                });
            }

            req.body.password = bcrypt.hashSync(req.body.password, 8);
        }
        if (req.body.username) {
            req.body.username = user.username;
        }
        Object.assign(user, req.body);
        user.save(function(err, user) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: user,
                message: 'Cập nhật thông tin thành công'
            });
        });
    });
}

exports.updateInfo = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        user.name = req.body.name;
        user.school = req.body.school;
        if (req.file) {
            if (fs.existsSync(path.join(__dirname + '/../uploads/avatars/' + user.avatar))) fs.rmSync(path.join(__dirname + '/../uploads/avatars/' + user.avatar));
            user.avatar = config.host + '/static/avatars/' + req.file.filename;
        }
        user.save(function(err, user) {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            res.status(200).send({
                status: 'success',
                data: user,
                message: 'Cập nhật thông tin thành công'
            });
        });
    });
}