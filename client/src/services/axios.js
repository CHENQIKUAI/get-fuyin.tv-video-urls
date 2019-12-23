import Axios from "axios";
const instance = Axios.create({
    // timeout: 1000,
    baseURL: 'http://localhost:3001',
    headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;