import { mapActions } from 'vuex';
import api from '../../api'

const getDefaultState = () => {
    return {
        pCategories: {},
    };
};

const state = getDefaultState();

const getters = {
    pCategories(state) {
        return state.pCategories;
    },
};

const mutations = {
    setPCategories(state, pCategories) {
        state.pCategories = pCategories;
    }
};

const actions = {
    async getPCategories({ commit }, { setFirstCategoryForProduct }) {
        try {
            const res = await api.get(`categories?page=1&limit=100`)
            const pCategories = res.data.data;
            commit("setPCategories", pCategories);
            if (setFirstCategoryForProduct) {
                commit("setProductCategoryId", pCategories.data[0]?.id);
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