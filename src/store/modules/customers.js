import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        pCustomers: [],
        customer: {},
    };
};

const state = getDefaultState();

const getters = {
    pCustomers(state) {
        return state.pCustomers;
    },
    customer(state) {
        return state.customer;
    },
};

const mutations = {
    setPCustomers(state, pData) {
        state.pCustomers = pData;
    },
    setCustomers(state, data) {
        state.customer = data;
    },
};

const actions = {
    async getPCustomers({ commit }, { page, keyWord }) {
        try {
            const res = await api.get(`customers?page=${page}&limit=10&keyWord=${keyWord}`)
            const data = res.data
            console.log(data);
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            const pData = res.data.data;
            console.log(res.data.message, pData);
            commit("setPCustomers", pData);
        } catch (e) {
            console.log(e)
        }
    },
    async getCustomerById({ commit }, id) {
        try {
            const res = await api.get(`customers/${id}`)
            const entity = res.data.data;
            console.log(entity)
            commit("setCustomers", entity);
            router.push({
                name: 'customers.get',
                params: { id }
            })
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