const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DoneExerciseSchema = new Schema({
    userId: String,
    exercises: Array,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const DoneExercise = mongoose.model('done_exercises', DoneExerciseSchema);
module.exports = DoneExercise;