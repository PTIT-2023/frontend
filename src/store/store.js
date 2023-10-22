import { createStore } from "vuex";

import notification from "./modules/notification";
import products from "./modules/products";
import categories from "./modules/categories";
import supplierOrders from "./modules/supplierOrders";
import importForms from "./modules/importForms";
import orderStatuses from "./modules/orderStatuses";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        notification,
        products,
        categories,
        supplierOrders,
        importForms,
        orderStatuses,
    }
})