const express = require('express');
const app=express();
require('./config/connect');
app.use(express.json());

const cors = require('cors')
app.use(cors())

const loginRoute= require('./routes/login');
const employeeRoute= require('./routes/employee');
const visiteRoute= require('./routes/visite');

app.use('/login',loginRoute);
app.use('/employee',employeeRoute);
app.use('/visite',visiteRoute);



app.listen(3000, ()=>{
    console.log('server work')
}
)