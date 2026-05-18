const axios=
require("axios");

const getRecommendation=
async(employees)=>{

try{

const prompt=`

Analyze these employees and provide:

1. Promotion Recommendation
2. Employee Ranking
3. Training Suggestions
4. Feedback

Employees:

${employees.map(
(emp,index)=>`

${index+1})

Name:
${emp.name}

Department:
${emp.department}

Skills:
${emp.skills.join(", ")}

Performance Score:
${emp.performanceScore}

Experience:
${emp.experience}

`
).join("\n")}

Return ONLY valid JSON.

NO markdown.
NO backticks.
NO explanation.

Format:

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

let aiText=
response.data
.choices[0]
.message
.content;

aiText=
aiText
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

return JSON.parse(
aiText
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