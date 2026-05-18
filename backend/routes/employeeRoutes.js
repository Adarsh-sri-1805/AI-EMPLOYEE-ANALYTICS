const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);

const{

addEmployee,
getEmployees,
searchEmployee,
updateEmployee,
deleteEmployee

}
=
require(
"../controllers/employeeController"
);

router.post(
"/",
protect,
addEmployee
);

router.get(
"/",
protect,
getEmployees
);

router.get(
"/search",
protect,
searchEmployee
);

router.put(
"/:id",
protect,
updateEmployee
);

router.delete(
"/:id",
protect,
deleteEmployee
);

module.exports=
router;