const User = require('./../../schema/users');

module.exports = (req, res, next) => {
    console.log(req.profile._id);
    try{
        User.findByIdAndDelete(req.profile._id)
        .then(()=> res.json('user deleted'))
        .then(err => res.status(400).json('error: '+  err));

    }catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }


};
