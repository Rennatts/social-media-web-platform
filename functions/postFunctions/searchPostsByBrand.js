const Post = require("../../schema/post");

module.exports = async (req, res) => {
  const searchBrandInput = req.body.searchBrandInput;

  try {
    let posts = await Post.find()
    .populate("postedBy", "_id name url key followers")
    .populate("comments", "text created")
    .populate('comments.postedBy', '_id name url')
    .select("_id brand productname category body url key created likes")

    if (searchBrandInput === "" || searchBrandInput === null) {
      res.status(401).json(posts);
    } else {
      const findProductByInput = posts.filter(
        (post) =>
          String(post.brand).toLowerCase().split(" ").join("") ===
          String(searchBrandInput).toLowerCase().split(" ").join("") 
      )
      res.json(findProductByInput);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
  
};