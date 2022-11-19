const Post = require('./../../schema/post');


module.exports = (req, res) => {
    Post.find({postedBy: req.profile.following})
    .populate("postedBy", "_id name url key followers")
    .populate("comments", "text created")
    .populate('comments.postedBy', '_id name url')
    .select("_id brand productName category body created likes url key")
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