const Post = require("../../schema/post");


module.exports = async (req, res) => {
  try {
    let posts = await Post.find()
    .populate("postedBy", "_id name url key followers");
    let rankingByComments = posts.sort((a, b) => b.comments.length - a.comments.length)
    res.json(rankingByComments);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }

};
