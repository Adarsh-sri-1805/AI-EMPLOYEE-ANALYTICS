const Employee=
require("../models/Employee");

const addEmployee=
async(req,res)=>{

try{

const employee=
await Employee.create(
req.body
);

res.status(201)
.json(employee);

}

catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

const getEmployees=
async(req,res)=>{

try{

const employees=
await Employee.find();

res.status(200)
.json(employees);

}

catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

const searchEmployee=
async(req,res)=>{

try{

const{
department
}=req.query;

const employees=
await Employee.find({

department

});

res.status(200)
.json(employees);

}

catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

const updateEmployee=
async(req,res)=>{

try{

const employee=
await Employee.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.status(200)
.json(employee);

}

catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

const deleteEmployee=
async(req,res)=>{

try{

await Employee.findByIdAndDelete(
req.params.id
);

res.status(200)
.json({

message:
"Employee deleted"

});

}

catch(error){

res.status(500)
.json({

message:
error.message

});

}

};

module.exports={

addEmployee,
getEmployees,
searchEmployee,
updateEmployee,
deleteEmployee

};