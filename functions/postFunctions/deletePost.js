module.exports = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfully!"
        })

    });
    
};