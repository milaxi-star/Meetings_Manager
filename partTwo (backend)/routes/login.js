const express=require('express');

const router=express.Router();

const login=require('../models/login');

const bcrypt= require('bcrypt');

const jwt=require('jsonwebtoken')

router.post('/add', async (req, res) => {
    data = req.body; // Get the request body data
    log = new login(data); // Create a new login object with the data
    salt = bcrypt.genSaltSync(10); // Generate a salt for password hashing
    cryptedPass = await bcrypt.hashSync(data.password, salt); // Hash the password with the generated salt
    log.password = cryptedPass; // Assign the hashed password to the login object
    log.save() // Save the login object to the database
        .then((savedlog) => { // If the login object is successfully saved
            res.status(200).send(savedlog); // Send a success response with the saved login object
        })
        .catch((err) => { // If an error occurs while saving the login object
            res.status(400).send(err); // Send an error response with the error message
        });
});

router.post('/signin', async(req, res)=>{
    data = req.body;
    user= await login.findOne({email: data.email})
    if(!user){
        res.status(404).send('email ou password invalide')
    }
    else{
        validPass= bcrypt.compareSync(data.password, user.password)
        if(!validPass){
            res.status(401).send('email ou password invalide')
        }
        else{
            payload={
                email: user.email,
                role: user.role
            }//the payload contains the information that the token would show

            token = jwt.sign(payload , 'abcdefg')

            res.status(200).send({mytoken: token})
        }
    }
}) // sign in using the token 


router.get('/getbyemail/:email',(req,res)=>
{

    em=req.params.email;
    login.findOne({email: em})
    .then(
      (logins)=>{
        res.send(logins);
      }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
}
)


router.get('/getbyrole/:r',(req,res)=>
{

    em=req.params.r;
    login.find({role: em})
    .then(
      (logins)=>{
        res.send(logins);
      }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
}
)

router.get('/get',(req,res)=>
{
    login.find()
    .then(
      (logins)=>{
        res.send(logins);
      }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
}
)

router.delete('/deleteuser/:id',(req,res)=>
{
    id1 = req.params.id;
    
    login.findOneAndDelete({ _id: id1 })
        .then(
            (deleted) => {
            res.send(deleted);
        })
        .catch(
            (err) => {
            res.send(err);
        });
}

)

router.put('/update/:email', (req, res) => {
    const myemail = req.params.email;
    const newdata = req.body;
    
    login.findOneAndUpdate({ email: myemail }, newdata, { new: true })
        .then(updated => {
            res.send(updated);
        })
        .catch(err => {
            res.send(err);
        });
});


module.exports=router;
