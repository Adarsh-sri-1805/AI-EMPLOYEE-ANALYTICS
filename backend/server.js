const express=
require("express");

const cors=
require("cors");

const dotenv=
require("dotenv");

const connectDB=
require("./config/db");

const authRoutes=
require("./routes/authRoutes");

const employeeRoutes=
require("./routes/employeeRoutes");

const aiRoutes=
require("./routes/aiRoutes");

dotenv.config();

const app=
express();

connectDB();

app.use(
cors()
);

app.use(
express.json()
);

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/employees",
employeeRoutes
);

app.use(
"/api/ai",
aiRoutes
);

app.get(
"/",
(req,res)=>{

res.send(
"AI Employee Analytics Backend Running"
);

}
);

const PORT=
process.env.PORT
||
5000;

app.listen(
PORT,
()=>{

console.log(
`Server running on ${PORT}`
);

}
);