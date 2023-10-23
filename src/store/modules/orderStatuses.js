import api from '@/api'

const getDefaultState = () => {
    return {
        orderStatuses: [],
    };
};

const state = getDefaultState();

const getters = {
    orderStatuses(state) {
        return state.orderStatuses;
    },
};

const mutations = {
    setOrderStatuses(state, data) {
        state.orderStatuses = data;
    },
};

const actions = {
    async getOrderStatuses({ commit, getters }) {
        try {
            const res = await api.get(`master/order-status`)
            const list = res.data.data;
            commit("setOrderStatuses", list);
            if (!getters.selectedCustomerOrderStatus) {
                commit("setSelectedCustomerOrderStatus", list[0]);
            }
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