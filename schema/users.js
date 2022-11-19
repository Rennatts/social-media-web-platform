const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true,
    },
    salt: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
    },
    name: String,
    size: Number,
    key: String,
    url: String,
    about: {
        type: String,
        trim: true,
    },
    following: [{
        type: ObjectId,
        ref: "user",
    }],
    followers: [{
        type: ObjectId,
        ref: "user",
    }],
    followingBrand: [{
        type: ObjectId,
        ref: "branduser",
    }]

});


//virtual field
userSchema.virtual('password')
.set(function(password) {
    //create temporary variable called _password
    this._password = password
    //generate a timestamp
    this.salt = uuidv4()
    //encryptPassword
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password;
});


//methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch(err) {
            return "";
        }
    }
};



userSchema.pre('save', function(){
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});


userSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === "s3"){
        return s3.deleteObject({
            Bucket: 'my-first-buker',
            Key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));

    }
});




module.exports = mongoose.model("user", userSchema);