const User = require('../../schema/users');
const jwt = require("jsonwebtoken");
require("dotenv").config();




module.exports = (req, res) => {
    //find the user based on email
    const {email, password } = req.body
    User.findOne({email}, (err, user) => {
         //if error or no user
         if (err || !user ) {
             return res.status(401).json({
                 error: "user with that email is not registered. Please singin"
             })
         }
         //if user is found make sure the email password match
         //create authenticate method in model and use here
         if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "email and password do not match"
            })
         }
         //generate a token with user id and secret
         const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

         //persist the token as 't' in cookie with expiry date
         res.cookie("t", token, {expire: new Date() + 9999})

         //return response with user and token to frontend client
         const { _id, name, email } = user;
         return res.json({token, user: { _id, email, name }});
    });

    //return response with user and token to frontend client
    
};