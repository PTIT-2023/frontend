import api from '../../api'
import router from '../../router'

const getDefaultState = () => {
    return {
        products: [],
        product: {
            name: 'Cá vàng',
            description: `Cá vàng (hay cá Tàu, cá ba đuôi, cá vàng ba đuôi)`,
            // `Cá vàng (hay cá Tàu, cá ba đuôi, cá vàng ba đuôi) (danh pháp hai phần: Carassius auratus) 
            // là loài cá nước ngọt nhỏ thường được nuôi làm cảnh. 
            // Cá vàng là một trong những dòng cá được thuần hóa sớm nhất 
            // và ngày nay vẫn là một trong những loài cá cảnh phổ biến nhất cho cả bể cá trong nhà và hồ cá ngoài trời.`
            habitat: 'Dưới nước',
            temperature: 20,
            ph: 7.5,
            position: 'Đáy bể',
            reproductionMethod: 'Đẻ trứng',
            foodType: 'Thức ăn cho cá',
            maxSize: 5,
            categoryId: '',
            imageList: [
                'https://i.ytimg.com/vi/y7A-m5tL3fQ/maxresdefault.jpg'
            ]
        }
    };
};

const state = getDefaultState();

const getters = {
    products(state) {
        return state.products;
    },
    product(state) {
        return state.product;
    }
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_PRODUCT_CATEGORY_ID(state, categoryId) {
        state.product.categoryId = categoryId;
    }
};

const actions = {
    getProducts({ commit }) {
        api
            .get(`products?categoryId=&orderByPrice=&page=1&limit=10`)
            .then((res) => {
                commit("SET_PRODUCTS", res.data.data);
            })
            .catch((error) => console.log(error));
    },
    async createProduct({}, product) {
        console.log(product)
        try {
            await api.post(`products`, product)
            router.push({
                name: 'products.list'
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