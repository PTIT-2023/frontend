import api from '@/api'
import router from '@/router'

const getDefaultState = () => {
    return {
        auth: {}
    };
};

const state = getDefaultState();

const getters = {
    auth(state) {
        return state.auth;
    }
};

const mutations = {
    setAuth(state, data) {
        state.auth = data
    },
};

const actions = {
    async login({ commit }, loginRequest) {
        try {
            const res = await api.post(`auth/signin`, loginRequest)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            commit("setAuth", data.data);
            router.push({
                name: 'dashboard'
            })
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
};

export default {
    state,
    getters,
    mutations,
    actions
};