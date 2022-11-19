const User = require("../../schema/users");

module.exports = (req, res) => {
    let user = User.findOne(req.profile)
    .populate('followers', '_id name url')
    .select("_id name")
    .exec((err, user) => {
        if(err) res.json({error: err});
        res.json(user);
    })
};

