module.exports = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }

    next();

};