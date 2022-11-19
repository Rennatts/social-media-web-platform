const Post = require('./../../schema/post');


module.exports = (req, res) => {
    Post.find({postedBy: req.profile._id})
    .populate("postedBy", "_id name url key followers")
    .select("_id brand productname category body created likes url key")
    .populate('comments.postedBy', "_id name url key")
    .sort({ created: -1 })
    .exec((err, posts)=> {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(posts);
        
    });

};