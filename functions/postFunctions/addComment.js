const Post = require('./../../schema/post');


module.exports = (req, res) => {
    let comment = {text: req.body.comment};
    comment.postedBy = req.body.userId;

    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: {comments: comment }},
        {new: true}
    )
    .sort({ created: -1 })
    .exec((err,result) => {
        if(err){
            res.json({error: err});
        } else {
            res.json(result);
            console.log(result);
        }
    });

};

