import api from '../../api'

const getDefaultState = () => {
    return {
        categories: {},
    };
};

const state = getDefaultState();

const getters = {
    categories(state) {
        return state.categories;
    },
};

const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    }
};

const actions = {
    async getCategories({ commit }, { setFirstCategoryForProduct }) {
        try {
            const res = await api.get(`categories`)
            const categories = res.data.data;
            commit("setCategories", categories);
            if (setFirstCategoryForProduct) {
                commit("setProductCategoryId", categories[0]?.id);
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