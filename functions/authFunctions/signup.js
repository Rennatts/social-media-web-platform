const User = require('./../../schema/users');




module.exports =  async(req, res) => {
    try{
        let {name, email, password } = req.body;
        let userExists = await (await User.findOne({email}));

        if(userExists) return res.status(401).send("email already registered");

        const user = await new User({
            name, 
            email,
            password
        });

        await user.save();
        res.status(200).json({user});

    } catch(error) {
        console.error(error.message);
        return res.status(500).send("server error");
    }
};