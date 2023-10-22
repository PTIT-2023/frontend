import api from '@/api'
import router from '@/router';

const getDefaultState = () => {
    return {
        // selectedCustomerOrderStatus: 'WAITING',
        pCustomerOrders: {},
        customerOrder: {},
    };
};

const state = getDefaultState();

const getters = {
    pCustomerOrders(state) {
        return state.pCustomerOrders;
    },
    customerOrder(state) {
        return state.customerOrder;
    },
    // orderCustomerDetailList(state) {
    //     return state.CustomerOrder.orderCustomerDetailList
    // },
    // mCustomerOrder(state) {
    //     return state.mCustomerOrder;
    // },
    // mOrderCustomerDetailList(state) {
    //     return state.mCustomerOrder.detail
    // }
};

const mutations = {
    setPCustomerOrders(state, pData) {
        state.pCustomerOrders = pData;
    },
    setCustomerOrder(state, data) {
        state.customerOrder = data;
    },
    // addProductToOrderCustomerDetail(state, data) {
    //     const { id, name, imageList, inventoryQuantity } = data
    //     state.CustomerOrder.orderCustomerDetailList.unshift(
    //         { id, name, image: imageList ? imageList[0] : null, inventoryQuantity, quantity: 1, unitPrice: 1000 })
    // },
    // removeProductFromOrderCustomerDetail(state, id) {
    //     let list = state.CustomerOrder.orderCustomerDetailList.filter(product => product.id !== id)
    //     state.CustomerOrder.orderCustomerDetailList = list
    // },
    // setMCustomerOrder(state, data) {
    //     state.mCustomerOrder = data;
    // },
    // setMOrderCustomerDetailList(state, list) {
    //     state.mCustomerOrder.detail = list.map(p => {
    //         const { productId: id, productImage: image, name, inventoryQuantity, quantity, unitPrice, totalPrice } = p
    //         return { id, image, name, inventoryQuantity, quantity, unitPrice, totalPrice }
    //     });
    // },
};

const actions = {
    async getPCustomerOrders({ commit }, { orderStatusId, page, keyWord }) {
        try {
            const res = await api.get(`order-customers?orderStatusId=${orderStatusId}&page=${page}&limit=10&keyWord=${keyWord}`)
            const data = res.data
            console.log(data);
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            const pData = res.data.data;
            console.log(res.data.message, pData);
            commit("setPCustomerOrders", pData);
        } catch (e) {
            console.log(e)
        }
    },
    // resetCustomerOrder({ commit }) {
    //     console.log('reset')
    //     commit("setCustomerOrder", {
    //         CustomerName: '',
    //         deliveryDate: 0,
    //         orderDate: 0,
    //         employeeId: 'e13334a4-f3bf-45e7-9aae-98d35d164ee6',
    //         orderCustomerDetailList: [],
    //         // status: 'WAITING'
    //     });
    // },
    // async createCustomerOrder({ commit }, order) {
    //     order.orderDate = Date.now()
    //     order.orderCustomerDetailList = order.orderCustomerDetailList.map(product => {
    //         const { id: productId, quantity, unitPrice: price } = product
    //         return { productId, quantity, price }
    //     })
    //     console.log(order)
    //     try {
    //         const res = await api.post(`order-Customers`, order)
    //         const data = res.data
    //         commit("SHOW_NOTIFICATION", data)
    //         if (data.code >= 400) return;
    //         commit("setSelectedCustomerOrderStatus", 'WAITING')
    //         router.push({
    //             name: 'Customer-orders.list'
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    // async getCustomerOrderById({ commit }, id) {
    //     try {
    //         const res = await api.get(`order-Customers/${id}`)
    //         const entity = res.data.data;
    //         console.log(entity)
    //         commit("setMCustomerOrder", entity);
    //         commit("setMOrderCustomerDetailList", entity.productsList);
    //         router.push({
    //             name: 'Customer-orders.edit',
    //             params: { id }
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    // async cancelCustomerOrderById({ commit, dispatch }, id) {
    //     try {
    //         const res = await api.put(`order-Customers/${id}`)
    //         console.log(res.data.message)
    //         commit("SHOW_NOTIFICATION", res.data)
    //         commit("setSelectedCustomerOrderStatus", 'CANCELLED')
    //         router.push({
    //             name: 'Customer-orders.list'
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