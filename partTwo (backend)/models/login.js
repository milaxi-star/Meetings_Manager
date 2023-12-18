const mongoose = require('mongoose');

const login= mongoose.model('login',
{
    email:{
        type: String
    },
    password:{
        type: String
    },
    role:{
        type : String
    }
});

module.exports= login;