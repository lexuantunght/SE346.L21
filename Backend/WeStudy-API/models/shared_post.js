const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SharedPostSchema = new Schema({
    name: String,
    author: String,
    from: String,
    photo: String,
    content: String,
    views: Number
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const SharedPost = mongoose.model('shared_posts', SharedPostSchema);
module.exports = SharedPost;