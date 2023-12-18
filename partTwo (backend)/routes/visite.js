const express=require('express');

const router=express.Router();

const Visite = require('../models/visite');


router.post('/add',(req, res)=> //POST
{
    data=req.body;
    vs=new Visite(data);
    vs.save()
    .then(
        (savedlog)=>{
            res.status(200).send(savedlog)
    })
    .catch(
        (err)=>{
            res.status(400).send(err)
    }
    )
}
)

router.get('/getbydate/:date',(req,res)=> //GET BY DATE
{

    dt=req.params.date;
    Visite.find({date:dt}) //find the document that has date=dt
    .then(
      (found)=>{
        res.status(200).send(found);
      }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
}
)

router.get('/getevents/',(req,res)=> //GET ALL
{

    dt=req.params.date;
    Visite.find() //find the document that has date=dt
    .then(
      (found)=>{
        res.status(200).send(found);
      }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
}
)

router.get('/getbycontact/:nomemp',(req,res)=>   //GET BY CONTACT
{

    ct=req.params.nomemp;
    const decodedct = decodeURIComponent(ct);
    Visite.findOne({nomemp:decodedct})
    .then(
      (found)=>{
        res.status(200).send(found);
      }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
}
)

router.get('/geteventbyid/:id', (req, res) => {
    const vs = req.params.id;
    Visite.findOne({ _id: vs })
      .then((found) => {
        res.status(200).send(found);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });
  

router.get('/getbysociete/:societe',(req,res)=>   //GET BY SOCIETE
{

    sc=req.params.societe;
    Visite.findOne({societe:sc}) 
    .then(
      (found)=>{
        res.status(200).send(found);
      }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
}
)

router.delete('/delete/:id', (req, res) => {
    id1 = req.params.id;
    
    Visite.findOneAndDelete({ _id: id1 })
        .then(
            (deleted) => {
            res.send(deleted);
        })
        .catch(
            (err) => {
            res.send(err);
        });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const newdata = req.body;
  
    Visite.findOneAndUpdate({ _id: id }, newdata, { new: true }) // Add { new: true }
      .then((updated) => {
        res.send(updated);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  


module.exports=router;
