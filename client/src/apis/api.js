import axios from "axios"

const api = axios.create({
    // baseURL:"http://localhost:9000",
    baseURL:"http://69.62.79.175:9000",
    headers:{
        'Content-Type':'application/json'
    }
})

export default api;