const Employee=
require("../models/Employee");

const getRecommendation=
require(
"../services/openrouterService"
);

const recommend=
async(req,res)=>{

try{

const employees=
await Employee.find();

const result=
await getRecommendation(
employees
);

res.status(200)
.json(result);

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
recommend
};