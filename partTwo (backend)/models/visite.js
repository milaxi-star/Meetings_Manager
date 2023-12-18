const mongoose = require('mongoose');

const Visite= mongoose.model('Visite ',
{
    nomv:{
        type: String
    },
    societe:{
        type: String
    },
    nomemp:{
        type: String
    },
    typev:{
        type: String
    },
    date:{
        type: String
    },
    objet:{
        type: String
    },
    desc:{
        type: String
    },
    departement:{
        type: String
    }
});

module.exports= Visite;