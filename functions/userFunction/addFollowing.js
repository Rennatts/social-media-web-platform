const User = require('./../../schema/users');


module.exports = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        {$push: {following: req.body.followId}},
        { new: true}, 
        (err, res) => {
            if (err) {
                return res.json({error: err})
            } 
            next();
        }  
    );

};