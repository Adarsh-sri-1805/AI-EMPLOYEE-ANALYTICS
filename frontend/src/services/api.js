import axios from "axios";

const API=
axios.create({

baseURL:
"https://ai-employee-analytics-1.onrender.com/api"

});

export default API;