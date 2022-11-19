const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
require('dotenv').config();
const expressValidator = require('express-validator');
//set up express
const app = express();
var cookieParser = require("cookie-parser");
const path = require('path');



//allows us to use body json thing to create posts
app.use(express.json());

//we prevent from cors policy warnings
app.use(cors());


app.use(expressValidator());  //this line to be addded

app.use(cookieParser());



//specify in which port our app will run
const PORT = process.env.PORT || 5050


app.listen(PORT, ()=> console.log(`server has started at port ${PORT}`));



//set up mongoose
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: false, 
        keepAlive: true
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connected");
    }); 



app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error: "Unauthorized"});
    }
});



app.use('/files', express.static(path.resolve(__dirname, "uploads")))



//set routes
const auth = require('./routes/auth');
const post = require('./routes/post');
const user = require("./routes/user")


//api docs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data)=> {
        if(err) {
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs);
    });
});


app.use('/auth', auth);
app.use('/posts', post);
app.use('/users', user);


