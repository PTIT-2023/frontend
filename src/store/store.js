import { createStore } from "vuex";

import notification from "./modules/notification";
import products from "./modules/products";
import categories from "./modules/categories";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        notification,
        products,
        categories
    }
})