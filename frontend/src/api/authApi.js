import axios from 'axios'
const api = 'http://localhost:3001/api/login'
export default { login : (data) => axios.post(`${api}`,data) }