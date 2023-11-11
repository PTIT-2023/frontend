import axios from 'axios'
import localStorageHelper from './helpers/localStorageHelper';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        const token = localStorageHelper.getToken();
        const auth = token ? `Bearer ${token}` : null;
        config.headers["Authorization"] = auth;
        return config;
    },
    error => {
        console.log('Error in api.js: ' + error);
        Promise.reject(error);
    }
);

export default instance;