const Post = require('../../schema/post');

module.exports = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name url key followers")
    .populate("comments", "text created")
    .populate('comments.postedBy', '_id name url')
    .select("_id brand productname category body url key created likes")
    .sort({ created: -1})
    .then(posts => {
        res.json(posts);
    })
    .catch(err => console.log(err));
};


