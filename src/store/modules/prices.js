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
    // async createImportForm({ commit, getters }) {
    //     const supplierOrder = getters.mSupplierOrder;
    //     const importDetailList = supplierOrder.detail.map(product => {
    //         console.log(product.id);
    //         const { id: productId, quantity, unitPrice: price } = product
    //         return { productId, quantity, price }
    //     })
    //     const importForm = {
    //         createDate: Date.now(),
    //         employeeId: 'e13334a4-f3bf-45e7-9aae-98d35d164ee6',
    //         orderSupplierId: supplierOrder.id,
    //         importDetailList
    //     }
    //     console.log(importForm);
    //     try {
    //         const res = await api.post(`import-forms`, importForm)
    //         const data = res.data
    //         commit("SHOW_NOTIFICATION", data)
    //         if (data.code >= 400) return;
    //         commit("setSelectedSupplierOrderStatus", 'IMPORTED')
    //         router.push({
    //             name: 'supplier-orders.list'
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
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