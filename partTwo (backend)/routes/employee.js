const express=require('express');

const router=express.Router();

const employee=require('../models/employee');

router.post('/add',(req, res)=> //POST
{
    data=req.body;
    emp=new employee(data);
    emp.save()
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

router.get('/getbyid/:id', (req, res) => {  
    const emp = req.params.id;
  
    employee.findOne({ _id: emp })
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get('/getbydepartment/:departement', (req, res) => {  
    const dept = req.params.departement;
    const decodeddept = decodeURIComponent(dept); // Decode the URL-encoded parameter
  
    employee.find({ departement: decodeddept })
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.get('/getemployee', (req, res) => {  
  
    employee.find()
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.delete('/deleteemp/:id',(req,res)=>
{
    id1 = req.params.id;
    
    employee.findOneAndDelete({ _id: id1 })
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

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const newdata = req.body;

  employee.findOneAndUpdate({ _id: id }, newdata, { new: true }) // Add { new: true }
    .then((updated) => {
      res.send(updated);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports=router;
