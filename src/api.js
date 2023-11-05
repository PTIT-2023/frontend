import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth')?.accessToken}`;

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

export default instance;