const Post = require("../../schema/post");

module.exports = async (req, res) => {
  const { searchInput } = req.body;

  try {
    let posts = await Post.find();

    if (searchInput === "" || searchInput === null) {
      res.status(401).json(posts);
    } else {
      const findPostBySearchInput = posts.filter(
        (post) =>
          String(post.text).toLowerCase().split(" ").join("") ===
          String(searchInput).toLowerCase().split(" ").join("")
      );
      res.json(findPostBySearchInput);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
  
};