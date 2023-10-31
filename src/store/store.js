import { createStore } from "vuex";

import notification from "./modules/notification";
import dialog from "./modules/dialog";
import addPriceDialog from "./modules/addPriceDialog";
import addImageDialog from "./modules/addImageDialog";
import products from "./modules/products";
import prices from "./modules/prices";
import categories from "./modules/categories";
import supplierOrders from "./modules/supplierOrders";
import importForms from "./modules/importForms";
import orderStatuses from "./modules/orderStatuses";
import customerOrders from "./modules/customerOrders";
import customers from "./modules/customers";
import employees from "./modules/employees";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        notification,
        dialog,
        addPriceDialog,
        addImageDialog,
        products,
        prices,
        categories,
        supplierOrders,
        importForms,
        orderStatuses,
        customerOrders,
        customers,
        employees
    }
})