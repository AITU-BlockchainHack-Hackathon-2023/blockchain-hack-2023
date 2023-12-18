import axios from 'axios';

export const API_URL = process.env.API_URL;

// зачем указывать знак доллара ??
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.request.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
                baseURL: API_URL,
            })
            localStorage.setItem('token', response.data.accessToken)

            return $api.request(originalRequest);
        } catch (e) {
            console.log('NOT AUTHORIZED')
        }
    }
})

export default $api;