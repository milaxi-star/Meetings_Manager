const mongoose = require('mongoose');

const employee= mongoose.model('employee',
{
    nomemp:{
        type: String
    },
    departement:{
        type: String
    }
});

module.exports= employee;