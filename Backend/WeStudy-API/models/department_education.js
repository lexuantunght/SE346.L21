const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DepartmentEducationSchema = new Schema({
    name: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const DepartmentEducation = mongoose.model('department_educations', DepartmentEducationSchema);
module.exports = DepartmentEducation;