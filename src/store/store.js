import { createStore } from "vuex";

import notification from "./modules/notification";
import products from "./modules/products";
import prices from "./modules/prices";
import categories from "./modules/categories";
import supplierOrders from "./modules/supplierOrders";
import importForms from "./modules/importForms";
import orderStatuses from "./modules/orderStatuses";
import customerOrders from "./modules/customerOrders";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        notification,
        products,
        prices,
        categories,
        supplierOrders,
        importForms,
        orderStatuses,
        customerOrders,
    }
})