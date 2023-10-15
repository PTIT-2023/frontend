import api from '../../api'

const getDefaultState = () => {
    return {
        categories: [],
    };
};

const state = getDefaultState();

const getters = {
    categories(state) {
        return state.categories;
    },
};

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    }
};

const actions = {
    getCategories({ commit }) {
        api
            .get(`categories`)
            .then((res) => {
                const categories = res.data.data
                commit("SET_CATEGORIES", categories);
                commit("SET_PRODUCT_CATEGORY_ID", categories[0]?.id);
            })
            .catch((error) => console.log(error));
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};