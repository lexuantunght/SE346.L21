const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ChapterSchema = new Schema({
    name: String,
    subjectId: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Chapter = mongoose.model('chapters', ChapterSchema);
module.exports = Chapter;