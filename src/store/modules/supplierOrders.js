import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        pSupplierOrders: {},
        supplierOrder: {},
    };
};

const state = getDefaultState();

const getters = {
    pSupplierOrders(state) {
        return state.pSupplierOrders;
    },
    supplierOrder(state) {
        return state.supplierOrder;
    },
    orderSupplierDetailList(state) {
        return state.supplierOrder.orderSupplierDetailList
    }
};

const mutations = {
    setPSupplierOrders(state, pData) {
        state.pSupplierOrders = pData;
    },
    setSupplierOrder(state, data) {
        state.supplierOrder = data;
    },
    addProductToOrderSupplierDetail(state, data) {
        const { id, name, imageList, inventoryQuantity } = data
        state.supplierOrder.orderSupplierDetailList.unshift({ id, name, imageList, inventoryQuantity, quantity: 1, price: 1000 })
    },
    removeProductFromOrderSupplierDetail(state, id) {
        let list = state.supplierOrder.orderSupplierDetailList.filter(product => product.id !== id)
        state.supplierOrder.orderSupplierDetailList = list
    }
};

const actions = {
    async getPSupplierOrders({ commit }, { status, page, keyWord }) {
        console.log(status, page, keyWord);
        try {
            const res = await api.get(`order-suppliers?status=${status}&page=${page}&limit=10&keyWord=${keyWord}`)
            const data = res.data
            console.log(data);
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            const pData = res.data.data;
            console.log(res.data.message, pData);
            commit("setPSupplierOrders", pData);
        } catch (e) {
            console.log(e)
        }
    },
    resetSupplierOrder({ commit }) {
        commit("setSupplierOrder", {
            supplierName: '',
            deliveryDate: 0,
            orderDate: 0,
            employeeId: 'e13334a4-f3bf-45e7-9aae-98d35d164ee6',
            orderSupplierDetailList: [],
            // status: 'WAITING'
        });
    },
    async createSupplierOrder({ commit }, order) {
        console.log(order)
        order.orderSupplierDetailList = order.orderSupplierDetailList.map(product => {
            const { id: productId, quantity, price } = product
            return { productId, quantity, price }
        })
        try {
            const res = await api.post(`order-suppliers`, order)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            router.push({
                name: 'supplier-orders.list'
            })
        } catch (e) {
            console.log(e)
        }
    },
    // async getProductById({ commit }, productId) {
    //     try {
    //         const res = await api.get(`products/${productId}`)
    //         const product = res.data.data;
    //         commit("setProduct", product);
    //         router.push({
    //             name: 'products.edit',
    //             params: { id: productId }
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    // async editProduct({ commit }, product) {
    //     console.log(product)
    //     try {
    //         const res = await api.put(`products`, product)
    //         const data = res.data
    //         commit("SHOW_NOTIFICATION", data)
    //         if (data.code >= 400) return;
    //         router.push({
    //             name: 'products.list'
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    // async deleteProductById({ commit, dispatch }, productIds) {
    //     console.log(productIds)
    //     try {
    //         const res = await api.delete(`products/${productIds[0]}`)
    //         console.log(res.data.message)
    //         commit("SHOW_NOTIFICATION", res.data)
    //     } catch (e) {
    //         console.log(e)
    //     }
    //     dispatch("getPProducts", {page: 1, keyWord: ''});
    // },
};

export default {
    state,
    getters,
    mutations,
    actions
};