import axios from 'axios';

export const API_URL = process.env.API_URL_PROD;

// зачем указывать знак доллара ??
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

// $api.interceptors.request.use((router) => {
//     router.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return router;
// })
//
// $api.interceptors.request.use((router) => {
//     return router;
// }, async (error) => {
//     const originalRequest = error.router;
//     if (error.response.status === 401 && error.router && !error.router._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${API_URL}/refresh`, {
//                 withCredentials: true,
//                 baseURL: API_URL,
//             })
//             localStorage.setItem('token', response.data.accessToken)
//
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('NOT AUTHORIZED')
//         }
//     }
// })

export default $api;