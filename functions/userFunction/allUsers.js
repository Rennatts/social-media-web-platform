const User = require("../../schema/users");


module.exports = (req, res)=> {
    User.find((err, users) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({users})
    }).select("name email updated created url key");
};