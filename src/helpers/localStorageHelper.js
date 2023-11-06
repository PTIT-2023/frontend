export default class localStorageHelper {
    static saveJwtResponse(data) {
        localStorage.setItem('auth', JSON.stringify(data))
    }
    static saveUser(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    static getUser() {
        return localStorage.getItem('user')
    }
    static clear() {
        localStorage.clear()
    }
}