const axios=
require("axios");

const getRecommendation=
async(employees)=>{

try{

const prompt=`

Analyze employees:

${employees.map(
(emp,index)=>`

${index+1}

Name:
${emp.name}

Department:
${emp.department}

Skills:
${emp.skills.join(",")}

Performance:
${emp.performanceScore}

Experience:
${emp.experience}

`
).join("")}

Return ONLY JSON:

{
"employees":[
{
"name":"",
"promotion":"",
"ranking":"",
"training":"",
"feedback":""
}
]
}

`;

const response=
await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:
"openai/gpt-oss-20b",

messages:[

{
role:"user",
content:prompt
}

]

},

{

headers:{

Authorization:
`Bearer ${process.env.OPENROUTER_API_KEY}`,

"Content-Type":
"application/json"

}

}

);

return JSON.parse(

response.data
.choices[0]
.message
.content

);

}

catch(error){

console.log(
error.response?.data||
error.message
);

throw new Error(
error.message
);

}

};

module.exports=
getRecommendation;