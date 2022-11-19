const expressJwt = require('express-jwt');
require("dotenv").config();


module.exports = expressJwt({
    //if the token is valid, express jwt appends the verified users id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET, 
    userProperty: "auth", 
    algorithms: ['sha1', 'RS256', 'HS256']
});

