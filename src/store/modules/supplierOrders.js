import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        pSupplierOrders: {},
        supplierOrder: {},
        mSupplierOrder: {}
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
    },
    mSupplierOrder(state) {
        return state.mSupplierOrder;
    },
    mOrderSupplierDetailList(state) {
        return state.mSupplierOrder.detail
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
        state.supplierOrder.orderSupplierDetailList.unshift(
            { id, name, image: imageList ? imageList[0] : null, inventoryQuantity, quantity: 1, unitPrice: 1000 })
    },
    removeProductFromOrderSupplierDetail(state, id) {
        let list = state.supplierOrder.orderSupplierDetailList.filter(product => product.id !== id)
        state.supplierOrder.orderSupplierDetailList = list
    },
    setMSupplierOrder(state, data) {
        state.mSupplierOrder = data;
    },
    setMOrderSupplierDetailList(state, list) {
        state.mSupplierOrder.detail = list.map(p => {
            const { productId: id, productImage: image, name, inventoryQuantity, quantity, unitPrice, totalPrice } = p
            return { id, image, name, inventoryQuantity, quantity, unitPrice, totalPrice }
        });
    },
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
        console.log('reset')
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
        order.orderDate = Date.now()
        order.orderSupplierDetailList = order.orderSupplierDetailList.map(product => {
            const { id: productId, quantity, unitPrice: price } = product
            return { productId, quantity, price }
        })
        console.log(order)
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
    async getSupplierOrderById({ commit }, id) {
        try {
            const res = await api.get(`order-suppliers/${id}`)
            const entity = res.data.data;
            console.log(entity)
            commit("setMSupplierOrder", entity);
            commit("setMOrderSupplierDetailList", entity.productsList);
            router.push({
                name: 'supplier-orders.edit',
                params: { id }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async cancelSupplierOrderById({ commit, dispatch }, id) {
        try {
            const res = await api.put(`order-suppliers/${id}`)
            console.log(res.data.message)
            commit("SHOW_NOTIFICATION", res.data)
            router.push({
                name: 'supplier-orders.list'
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