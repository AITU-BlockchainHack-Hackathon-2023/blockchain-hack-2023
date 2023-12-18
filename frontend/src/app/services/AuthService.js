import $api from "../http";

export default class AuthService {
    static async login(email) {
        // return $api.post('/login', {email, password})
        return $api.post('/user/login', {email})
    }

    static async registration(email) {
        return $api.post('/user/registration', {email})
    }

    static async logout() {
        return $api.post('/user/logout')
    }

    // static async sendCode(email) {
    //     return $api.post('/user/send-code', {email})
    // }

    static async checkCode(email, code) {
        return $api.post('/user/check-code', {email, code})
    }
    static async checkAuth() {
        return $api.get('/user/refresh')
    }
    static async updateName(name, userId) {
        return $api.post(`/user/update/${userId}`, {name})
    }
}