const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
    chapterId: String,
    subjectId: String,
    content: String,
    photos: Array,
    answers: Array,
    key: String,
    detail_key: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Exercise = mongoose.model('exercises', ExerciseSchema);
module.exports = Exercise;