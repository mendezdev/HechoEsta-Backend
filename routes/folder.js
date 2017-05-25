const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');
const folderService = require('../services/folderService');
const ext = require('file-extension');
let multer = require('multer');
let pathFolder = './angular-src/src/assets/img'

let storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, pathFolder);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + ext(file.originalname));
  }
});

let upload = multer({ storage: storage}).single('file');

router.get('/', (req, res, next) => {
    folderService.getAllFolders((err, folders) => {
        if(err){
            return res.json({
                success: false,
                err: err
            });
        }

        return res.json({
            success: true,
            folders: folders
        });
    });
})

router.post('/', (req, res, next) => {
    let path = '../../assets/img/';

    let newFolder = new Folder({
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        pages: req.body.pages,
        userCreated: req.body.userCreated,
        filePath: path + req.body.filePath,
        status: req.body.status
    });

    folderService.createFolder(newFolder, (err, folder) => {
        if(err){
            res.json({
                success: false,
                msg: "Failed to create a folder"
            });
        } else {
            res.json({
                success: true,
                msg: `Folder: "${folder.description}" was created`,
                folder: folder
            });
        }
    });
})

router.post('/uploadPhoto', (req, res, next) => {
     upload(req,res,function(err) {
        console.log('req.files',req.files);
        console.log('req.file',req.file);
        if(err) {
            return res.json({
                success: false,
                msg: 'Error uploading file!!!',
                err: err
            });
        } else {
            res.json({
                success: true,
                msg: 'File completed upload',
                data: req.file.filename
            });
        }
    });
})

module.exports = router;