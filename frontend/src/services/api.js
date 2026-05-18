import axios from "axios";

const API=
axios.create({

baseURL:
"https://ai-employee-analytics.onrender.com/api"

});

export default API;