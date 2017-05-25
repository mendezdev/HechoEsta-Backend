const Folder = require('../models/folder');

module.exports.getAllFolders = function(callback){
    let query = {status: true};
    
    Folder.find(query,callback);
}

module.exports.getFolderByDescription = function(description, callback){
    let query = {
        description: description,
        status: true
    };
    
    Folder.findOne(query, callback);
}

module.exports.createFolder = function(folder, callback){
    folder.save(callback);
}