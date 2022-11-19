const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multer = require('./../multer');
const s3 = new aws.S3();


let PostSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 2000
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    },
    created: {
        type: Date, 
        default: Date.now
    },
    name: {
        type: Object
    },
    size: {
        type: Object
    },
    key: {
        type: Object
    },
    url: {
        type: Object
    },
    likes: [{
        type: ObjectId, 
        ref: "user"
    }],
    productId: String,
    comments: [{
        text: String, 
        created: {type: Date, default: Date.now},
        postedBy: {
            type: ObjectId,
            ref: "user",
        },
    }],
},
{
    timestams: true,
}
);


PostSchema.pre('save', function(){
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});


PostSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === "s3"){
        return s3.deleteObject({
            Bucket: 'my-first-buker',
            Key: JSON.stringify(this.key), 
        }).promise()
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));

    }
});


const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;