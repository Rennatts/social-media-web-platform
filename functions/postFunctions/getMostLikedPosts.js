const Post = require("../../schema/post");


module.exports = async (req, res) => {
  try {
    //We order from the most to the least liked, as default sort is assigned as 1, when you use -1 you basically reverse the order of array
    let posts = await Post.find()
    .populate("postedBy", "_id name url key followers");
    let pott = posts.sort((a, b) => b.likes.length - a.likes.length)
    res.json(pott);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }

};
