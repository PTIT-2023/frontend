import api from '../../api'
import router from '../../router'

const getDefaultState = () => {
    return {
        pProducts: {},
        // product: {
        //     name: 'Cá vàng',
        //     description: `Cá vàng (hay cá Tàu, cá ba đuôi, cá vàng ba đuôi)`,
        //     // `Cá vàng (hay cá Tàu, cá ba đuôi, cá vàng ba đuôi) (danh pháp hai phần: Carassius auratus) 
        //     // là loài cá nước ngọt nhỏ thường được nuôi làm cảnh. 
        //     // Cá vàng là một trong những dòng cá được thuần hóa sớm nhất 
        //     // và ngày nay vẫn là một trong những loài cá cảnh phổ biến nhất cho cả bể cá trong nhà và hồ cá ngoài trời.`
        //     habitat: 'Dưới nước',
        //     temperature: 20,
        //     ph: 7.5,
        //     position: 'Đáy bể',
        //     reproductionMethod: 'Đẻ trứng',
        //     foodType: 'Thức ăn cho cá',
        //     maxSize: 5,
        //     categoryId: '',
        //     imageList: [
        //         'https://i.ytimg.com/vi/y7A-m5tL3fQ/maxresdefault.jpg'
        //     ]
        // },
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
};

const actions = {
    async getPProducts({ commit }, page) {
        try {
            const res = await api.get(`products?categoryId=&orderByPrice=DESC&page=${page}&limit=10`)
            const pProducts = res.data.data;
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
            temperature: 0,
            ph: 0,
            position: '',
            reproductionMethod: '',
            foodType: '',
            maxSize: 0,
            categoryId: '',
            imageList: []
        });
    },
    async createProduct({ }, product) {
        console.log(product)
        try {
            await api.post(`products`, product)
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
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};