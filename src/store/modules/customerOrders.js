import api from '@/api'
import router from '@/router';
import { data } from 'autoprefixer';

const getDefaultState = () => {
    return {
        selectedCustomerOrderStatus: null,
        pCustomerOrders: {},
        customerOrder: {},
    };
};

const state = getDefaultState();

const getters = {
    selectedCustomerOrderStatus(state) {
        return state.selectedCustomerOrderStatus;
    },
    pCustomerOrders(state) {
        return state.pCustomerOrders;
    },
    customerOrder(state) {
        return state.customerOrder;
    },
    customerOrderDetail(state) {
        return state.customerOrder.detail;
    },
};

const mutations = {
    setPCustomerOrders(state, pData) {
        state.pCustomerOrders = pData;
    },
    setCustomerOrder(state, data) {
        state.customerOrder = data;
        state.customerOrder.detail = data.productsList.map(p => {
            const { productId: id, productImage: image, name, inventoryQuantity, quantity, unitPrice, totalPrice } = p
            return { id, image, name, inventoryQuantity, quantity, unitPrice, totalPrice }
        })
    },
    setSelectedCustomerOrderStatus(state, data) {
        return state.selectedCustomerOrderStatus = data
    },
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
    async getCustomerOrderById({ commit }, id) {
        try {
            const res = await api.get(`order-customers/${id}`)
            const entity = res.data.data;
            console.log(entity)
            commit("setCustomerOrder", entity);
            router.push({
                name: 'customer-orders.edit',
                params: { id }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async updateCustomerOrderStatus({ commit }, {id, toStatus}) {
        console.log(id, toStatus)
        try {
            const res = await api.put(`order-customers?orderStatusIdTo=${toStatus.id}&id=${id}`)
            const data = res.data;
            console.log(data.message)
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return
            commit("setSelectedCustomerOrderStatus", toStatus)
            router.push({
                name: 'customer-orders.list'
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