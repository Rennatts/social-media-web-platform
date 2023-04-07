const { check, validationResult } = require('express-validator');

exports.createPostValidator = (req, res, next) => {

    req.check("body", "write a body").notEmpty();
    req.check("body", "body must be between 4 to 2000").isLength({
        min: 1,
        max: 2000
    });

    //check for errors
    const errors = req.validationErrors()

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();

};


exports.userSignupValidator = (req, res, next) => {
    //name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();

    //check for password
    req.check("email", "email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain @")
    .isLength({
        min: 4,
        max: 2000
    });

    //check for passwords
    req.check("password", "password is required").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number");

    //check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    };

    // proceed to next middleware
    next();

};




exports.branduserSignupValidator = (req, res, next) => {
    //name is not null and between 4-10 characters
    req.check("brandname", "Brand Name is required").notEmpty();

    req.check("city", "city is required").notEmpty();

    req.check("state", "state is required").notEmpty();

    req.check("address", "address is required").notEmpty();

    req.check("zip_code", "zip_code is required").notEmpty();

    //check for password
    req.check("email", "email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain @")
    .isLength({
        min: 4,
        max: 2000
    });

    //check for passwords
    req.check("password", "password is required").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number");

    //check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    };

    // proceed to next middleware
    next();

};



exports.createProductValidator = (req, res, next) => {
    req.check("productname", "write a product name").notEmpty();
    req.check("productname", "name must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });

    req.check("category", "write a category").notEmpty();
    req.check("category", "category must be between 4 to 50").isLength({
        min: 4,
        max: 50
    });

    req.check("description", "write a description").notEmpty();
    req.check("description", "description must be between 4 to 1000").isLength({
        min: 4,
        max: 1000
    });

    //check for errors
    const errors = req.validationErrors()

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }

    // proceed to next middleware
    next();

};
