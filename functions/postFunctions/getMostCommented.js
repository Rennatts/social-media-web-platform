const Post = require("../../schema/post");


module.exports = async (req, res) => {
    try {
      let posts = await Post.find()
      .populate("postedBy", "_id name url key followers")
      .sort({ comments: -1 })
      res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server Error...");
    }
};