const User = require('./../../schema/users');


module.exports = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        { $pull: { following: req.body.followId }},
        { new: true }, 
        (err, result) => {
            if (err) {
                return res.json({error: err})
            }
            next();
    });

};