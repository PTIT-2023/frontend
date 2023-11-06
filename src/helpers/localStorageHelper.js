export default class localStorageHelper {
    static isUserAuthenticated() {
        return localStorage.getItem("auth") && localStorage.getItem("user");
    }
    static saveJwtResponse(data) {
        localStorage.setItem('auth', JSON.stringify(data))
    }
    static saveUser(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    static getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
    static clear() {
        localStorage.clear()
    }
}