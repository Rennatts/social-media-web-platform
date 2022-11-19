const User = require('../../schema/users');


module.exports = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "signout success"})
};