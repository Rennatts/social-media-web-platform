const Post = require('./../../schema/post');


module.exports = (req, res) => {
  Post.findByIdAndUpdate(
      req.body.postId,
      {$push: {likes: req.body.userId}},
      {new: true}
  ).exec((err, result) => {
      if(err) {
        res.json({error: err});
      } else {
        res.json(result);
      }
  });

};