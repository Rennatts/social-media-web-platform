module.exports = (req, res) => {
    if(req.post.photo){
        res.set("Content-Type", req.post.photo.contentType)
        return res.send(req.post.photo)
    }

};