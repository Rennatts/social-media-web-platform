const User = require("../../schema/users");


module.exports = (req, res, next, id) => {

    User.findById(id)
    //populate followers and following users array
    .populate('following', '_id name url')
    .populate('followers', '_id name url')
    .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "user not found"
            });
        }
        req.profile = user //adds profile object in req with user info
        next();
    });
    
};