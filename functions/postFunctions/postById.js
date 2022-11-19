const Post = require('./../../schema/post');

module.exports = (req, res, next, id) => {
  Post.findById(id)
  .populate("postedBy", "_id name url key followers")
  .populate('comments', 'brand productname body created')
  .populate('comments.postedBy', "_id name url key")
  .sort({ created: -1 })
  .exec((err, post) => {
      if(err || !post) {
          return res.status(400).json({
              error: err
          })
      }
      req.post = post
      next();

  });
};