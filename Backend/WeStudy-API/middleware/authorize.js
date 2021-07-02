const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../utils/db');
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ status: 'fail', message: err });
            return;
        }
        Role.findOne({ name: 'admin' }).exec((err, role) => {
            if (err) {
                res.status(500).send({ status: 'fail', message: err });
                return;
            }
            if (role.users.includes(user._id)) next();
            else return res.status(403).send({ message: "Access denied!" });
        });
    }) 
}

const authorize = {
    verifyToken, verifyAdmin
};

module.exports = authorize;