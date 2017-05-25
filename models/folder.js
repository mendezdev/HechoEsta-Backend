const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        default: 0
    },
    pages: {
        type: Number,
        default: 0
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    updateDate:{
        type: Date,
        default: null
    },
    userCreated:{
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;