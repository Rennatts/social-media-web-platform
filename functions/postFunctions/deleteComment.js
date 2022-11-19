const Post = require('./../../schema/post');


module.exports = (req, res) => {

    let comment = req.body.comment;

    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: {comments: {_id: comment._id} }},
        {new: true}
    ).exec((err, result) => {
        if(err){
            res.json({error: err});
        } else {
            res.json(result);
        }
    
    });

};