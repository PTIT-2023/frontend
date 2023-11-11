import api from '@/api'
import router from '@/router'
import localStorageHelper from '../../helpers/localStorageHelper';

const getDefaultState = () => {
    return {
        user: {}
    };
};

const state = getDefaultState();

const getters = {
    user(state) {
        return state.user;
    }
};

const mutations = {
    setUser(state, data) {
        state.user = data
    },
};

const actions = {
    async login({ commit, dispatch }, loginRequest) {
        try {
            const res = await api.post(`auth/signin`, loginRequest)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            const jwtResponse = data.data
            localStorageHelper.saveJwtResponse(jwtResponse)
            dispatch('getUserProfileAfterLogin', jwtResponse.id)

        } catch (e) {
            if (e.response.data.status === 401) {
                commit("SHOW_NOTIFICATION", {
                    code: 401,
                    message: 'Email or password is incorrect!'
                })
            }
            console.log(e)
        }
    },
    async getUserProfileAfterLogin({ commit }, id) {
        try {
            const res = await api.get(`employees/${id}`)
            const employee = res.data.data;
            localStorageHelper.saveUser(employee)
            commit("setUser", employee);
            router.push({
                path: '/'
            })
        } catch (e) {
            console.log(e)
        }
    },
    async getUserProfile({ commit }, id) {
        try {
            const res = await api.get(`employees/${id}`)
            const employee = res.data.data;
            localStorageHelper.saveUser(employee)
            commit("setUser", employee);
        } catch (e) {
            console.log(e)
        }
    },
    async updateUserProfile({ commit }, user) {
        try {
            const res = await api.put(`employees`, user)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            localStorageHelper.saveUser(user)
            commit("setUser", {...user})
        } catch (e) {
            console.log(e)
        }
    },
    async updatePassword({ commit }, changePasswordData) {
        console.log(changePasswordData);
        try {
            const res = await api.put(`auth/change-password`, changePasswordData)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
        } catch (e) {
            console.log(e)
        }
    },
    tryAutoLogin({ commit, dispatch }) {
        const user = localStorageHelper.getUser()
        if (!user) {
            console.log("auth::tryAutoLogin() - No user found in local storage")
            if (window.location.pathname === "/") {
                dispatch("logout")
            }
            return;
        }

        commit("setUser", user);
    },
    async forgotPassword({ commit }, { email }) {
        try {
            const res = await api.post(`auth/forgot-password/send-email`, { email })
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            router.push({
                name: 'signin'
            })
        } catch (e) {
            if (e.response.data.status === 401) {
                commit("SHOW_NOTIFICATION", {
                    code: 401,
                    message: 'Email does not exist!'
                })
            }
            console.log(e)
        }
    },
    async resetPassword({ commit }, { token, password }) {
        console.log(token, password);
        try {
            const res = await api.put(`auth/forgot-password/reset`, { token, password })
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            router.push({
                name: 'signin'
            })
        } catch (e) {
            console.log(e)
        }
    },
    logout({ commit, dispatch }) {
        localStorageHelper.clear()
        router.push({
            path: '/signin'
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};