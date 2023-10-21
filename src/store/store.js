import { createStore } from "vuex";

import products from "./modules/products";
import categories from "./modules/categories";
import notification from "./modules/notification";

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