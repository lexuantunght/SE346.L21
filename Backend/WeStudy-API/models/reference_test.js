const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReferenceTestSchema = new Schema({
    name: String,
    department_education: String, 
    subject: String,
    from: String,
    photo: String,
    file: String,
    views: Number
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const ReferenceTest = mongoose.model('reference_tests', ReferenceTestSchema);
module.exports = ReferenceTest;