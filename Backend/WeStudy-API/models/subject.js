const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
    name: String,
    photo: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Subject = mongoose.model('subjects', SubjectSchema);
module.exports = Subject;