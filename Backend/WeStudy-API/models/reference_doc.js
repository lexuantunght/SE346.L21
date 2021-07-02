const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReferenceDocSchema = new Schema({
    name: String,
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

const ReferenceDoc = mongoose.model('reference_docs', ReferenceDocSchema);
module.exports = ReferenceDoc;