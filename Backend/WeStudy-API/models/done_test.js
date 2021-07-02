const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DoneTestSchema = new Schema({
    userId: String,
    tests: Array,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const DoneTest = mongoose.model('done_tests', DoneTestSchema);
module.exports = DoneTest;