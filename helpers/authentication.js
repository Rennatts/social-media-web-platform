const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET
    );

    req.branduser = decoded.branduser;  

    next();

};



