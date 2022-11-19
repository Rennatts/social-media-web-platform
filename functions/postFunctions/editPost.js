const Post = require('./../../schema/post');

module.exports = function(req, res, next){
    const { size, key, location: url = ""} = req.file;
    console.log(req.params.postId);

    Post.findByIdAndUpdate(req.params.postId, 
        {$set: 
            {
                updated: Date.now(),
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
            }
        },
            {new: true},
            function(err, post){
                if(err) {
                    res.json({error: err});
                }else{
                    res.send(post);
                    console.log(post);
                }
            }
    );

};

