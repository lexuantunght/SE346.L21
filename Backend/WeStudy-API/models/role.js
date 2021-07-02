const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    name: String, // admin, user
    users: Array
}, {
    timestamps: {
        createdAt: 'created_at',
    }
});

const Role = mongoose.model('roles', RoleSchema);
module.exports = Role;