const User = require('./../../schema/users');

module.exports = function(req, res, next){
    const { size, key, location: url = ""} = req.file;
    console.log(req.params.userId);
    User.findByIdAndUpdate(req.params.userId, 
        {$set: 
            {
                name: req.file.originalname,
                size,
                key,
                url,
                updated: Date.now(),
                name: req.body.name,
                about: req.body.about,
                password: req.body.password,
            }
        },
            {new: true},
            function(err, user){
                if(err) {
                    res.json({error: err});
                }else{
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    res.send(user);
                    console.log(user);
                }
            }
    );

};


