const crypto = require('crypto');
const Post = require('./schema/post');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
const multer = require("multer");
const path = require('path');



const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "uploads"));
        },
        filename: (req, file, callback) => {
            const buf = crypto.randomBytes(16);
            crypto.randomBytes(16, (err, buf)=> {
                if(err) callback(err);
            })
            file.key = `${buf.toString('hex')}-${file.originalname}`;

            callback(null, file.key)
        }

    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'new-bucket-social-media',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback) => {
            const buf = crypto.randomBytes(16);
            crypto.randomBytes(16, (err, buf)=> {
                if(err) callback(err);
            })
            callback(null, `${buf.toString('hex')}-${file.originalname}`)

        }
    }),
};




module.exports= {
    dest: path.resolve(__dirname, "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter : (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/fig'
        ];

        if(allowedMimes.includes(file.mimetype)){
            callback(null, true);
        } else {
            callback(new Error('invalid file type'))
        }

    }

};