import api from '@/api'
import router from '@/router'

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
            localStorage.setItem('auth', JSON.stringify(data.data))
            dispatch('getUserProfileById', data.data.id)
            router.push({
                path: '/'
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
    async getUserProfileById({ commit }, id) {
        try {
            const res = await api.get(`employees/${id}`)
            const employee = res.data.data;
            commit("setUser", employee);
        } catch (e) {
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