module.exports = (req, res) => {
    if(req.profile.photo.data) {
        res.set(("Content-Type:", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    } 
};