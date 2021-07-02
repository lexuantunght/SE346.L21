const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniversitySchema = new Schema({
    name: String,
    base_mark: Array,
    majors: Array,
    admission: String //html
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const University = mongoose.model('universities', UniversitySchema);
module.exports = University;