import api from '@/api'
import router from '@/router'

const getDefaultState = () => {
    return {
        pProducts: {},
        product: {},
    };
};

const state = getDefaultState();

const getters = {
    pProducts(state) {
        return state.pProducts;
    },
    product(state) {
        return state.product;
    },
    newProduct(state) {
        return state.newProduct;
    }
};

const mutations = {
    setPProducts(state, pProducts) {
        state.pProducts = pProducts;
    },
    setProduct(state, product) {
        state.product = product;
    },
    setProductCategoryId(state, categoryId) {
        state.product.categoryId = categoryId;
    },
    // addImageToProductImages(state, img) {
    //     state.product.imageList.unshift(img)
    // },
    // removeImageFromProductImagesByIndex(state, index) {
    //     state.product.imageList.splice(index, 1)
    // }
};

const actions = {
    async getPProducts({ commit }, { categoryId, page, keyWord }) {
        try {
            const res = await api.get(`products?categoryId=${categoryId}&orderByPrice=DESC&page=${page}&limit=10&keyWord=${keyWord}`)
            const data = res.data
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            const pProducts = res.data.data;
            console.log(res.data.message);
            commit("setPProducts", pProducts);
        } catch (e) {
            console.log(e)
        }
    },
    resetProduct({ commit }) {
        commit("setProduct", {
            name: '',
            description: '',
            habitat: '',
            temperature: 20,
            ph: 0,
            position: '',
            reproductionMethod: '',
            foodType: '',
            maxSize: 1,
            categoryId: '',
            imageList: [],
            status: false
        });
    },
    async createProduct({ commit }, product) {
        console.log(product)
        try {
            const res = await api.post(`products`, product)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            router.push({
                name: 'products.list'
            })
        } catch (e) {
            console.log(e)
        }
    },
    async getProductById({ commit }, productId) {
        try {
            const res = await api.get(`products/${productId}`)
            const product = res.data.data;
            commit("setProduct", product);
            router.push({
                name: 'products.edit',
                params: { id: productId }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async editProduct({ commit }, product) {
        console.log(product)
        try {
            const res = await api.put(`products`, product)
            const data = res.data
            commit("SHOW_NOTIFICATION", data)
            if (data.code >= 400) return;
            router.push({
                name: 'products.list'
            })
        } catch (e) {
            console.log(e)
        }
    },
    async deleteProductById({ commit, dispatch }, productIds) {
        console.log(productIds)
        try {
            const res = await api.delete(`products/${productIds[0]}`)
            console.log(res.data.message)
            commit("SHOW_NOTIFICATION", res.data)
        } catch (e) {
            console.log(e)
        }
        dispatch("getPProducts", {page: 1, keyWord: ''});
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};