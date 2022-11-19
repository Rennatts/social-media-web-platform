const Post = require('./../../schema/post');
require('dotenv').config();

module.exports =  async(req, res, next) => {

    const name = new Array;
    for(let i= 0; i < req.files.length; i++){
        name.push(req.files[i].originalname);

    }

    const size= new Array;
    for(let i= 0; i < req.files.length; i++){
        size.push(req.files[i].size);

    };

    const key= new Array;
    for(let i= 0; i < req.files.length; i++){
        key.push(req.files[i].key);

    };

    
    const url = new Array;
    for(let i= 0; i < req.files.length; i++){
        url.push(req.files[i].location);

    };


    const post = await Post.create({
        created: Date.now(),
        brand: req.body.brand,
        productname: req.body.productname,
        category: req.body.category,
        body: req.body.body,
        rating: req.body.rating,
        postedBy: req.profile,
        name: [],
        size: [],
        key: [],
        url: []
        
    });

    // Push an array to object
    post.name = name;
    post.size = size;
    post.key = key;
    post.url = url;

    
    post.postedBy.hashed_password = undefined;
    post.postedBy.salt = undefined;

    post.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(result);
    });

};
