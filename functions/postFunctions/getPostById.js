const Post = require('../../schema/post');

module.exports = async (req, res) => {
  try {
    return res.json(req.post)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }

};