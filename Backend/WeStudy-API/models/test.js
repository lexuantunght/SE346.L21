const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TestSchema = new Schema({
    subjectId: String,
    code: String,
    from: String,
    time_doing: Number,
    questions: Array,
    key_file: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Test = mongoose.model('tests', TestSchema);
module.exports = Test;