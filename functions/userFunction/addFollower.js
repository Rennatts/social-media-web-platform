const User = require('../../schema/users');


module.exports = (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId, 
        {$push: {followers: req.body.userId}}, 
        {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
        if(err) {
            return res.json({ error: err });
        }
        res.json(result);
    });

};