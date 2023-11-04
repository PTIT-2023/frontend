import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        productImages: [],
    };
};

const state = getDefaultState();

const getters = {
    productImages(state) {
        return state.productImages;
    },
};

const mutations = {
    setProductImages(state, list) {
        state.productImages = list;
    },
};

const actions = {
    async getProductImagesByProductId({ commit }, id) {
        try {
            const res = await api.get(`product-image?productId=${id}`)
            const body = res.data
            console.log(body);
            if (body.code >= 400) {
                commit("SHOW_NOTIFICATION", body)
                return
            }
            commit("setProductImages", body.data);
        } catch (e) {
            console.log(e)
        }
    },
    async addProductImage({ commit, dispatch }, productImage) {
        try {
            const res = await api.post(`product-image`, productImage)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            dispatch("getProductImagesByProductId", productImage.productId)
        } catch (e) {
            console.log(e)
        }
    },
    async deleteProductImageById({ commit, dispatch }, {id, productId}) {
        console.log(id);
        try {
            const res = await api.delete(`product-image/${id}`)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            dispatch("getProductImagesByProductId", productId)
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