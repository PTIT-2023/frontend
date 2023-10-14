import api from '../../api'

const getDefaultState = () => {
    return {
        products: []
    };
};

const state = getDefaultState();

const getters = {
    products(state) {
        return state.products;
    }
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    }
};

const actions = {
    getProducts({commit}) {
        api
        .get(`products?categoryId=&orderByPrice=&page=1&limit=10`)
            .then((res) => {
                commit("SET_PRODUCTS", res.data.data);
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