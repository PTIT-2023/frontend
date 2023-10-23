import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        prices: [],
    };
};

const state = getDefaultState();

const getters = {
    prices(state) {
        return state.prices;
    },
};

const mutations = {
    setPrices(state, list) {
        state.prices = list;
    },
};

const actions = {
    async getPricesByProductId({ commit }, id) {
        try {
            const res = await api.get(`price-details?productId=${id}`)
            const body = res.data
            console.log(body);
            if (body.code >= 400) {
                commit("SHOW_NOTIFICATION", body)
                return
            }
            commit("setPrices", body.data);
        } catch (e) {
            console.log(e)
        }
    },
    async createPriceDetail({ commit, dispatch }, priceDetail) {
        console.log(priceDetail);
        try {
            const res = await api.post(`price-details`, priceDetail)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            dispatch("getPricesByProductId", priceDetail.productId)
        } catch (e) {
            console.log(e)
        }
    },
    // async getImportFormById({ commit }, id) {
    //     try {
    //         const res = await api.get(`import-forms/${id}`)
    //         const entity = res.data.data;
    //         console.log(entity)
    //         commit("setMImportForm", entity);
    //         commit("setMImportFormDetail", entity.productsList);
    //         router.push({
    //             name: 'import-forms.get',
    //             params: { id }
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
};

export default {
    state,
    getters,
    mutations,
    actions
};